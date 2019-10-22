function showAll() {
    $.getJSON('./mhs.json', function (data) {
        let mhs = data.mahasiswa;
        let content = '';
        $.each(mhs, function (i, data) {
            content += '<div class="col-md-4 mb-3"><div class="card"><img src="' + data.foto + 
            '" class="card-img-top" alt="..." style="height: 250px; width: 100%;"><div class="card-body"><h5 class="card-title">' + data.nama + 
            '</h5> <p class="card-text">Mahasiwa dengan NIM ' + data.nim + 
            ' ini berasal dari ' + data.alamat_asal + 
            '.</p><a href="javascript:void(0);" onClick="showDetail(' + data.nim + ');" class="btn btn-info float-right">Detail</a></div></div></div>';

        });
        $('#list-profile').html(content);
    })
}

showAll();

$('.nav-link').on('click', function () {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    let link = $(this).html();
    if (link == 'Home') {
        showAll();
        $('h1').html('Profil Mahasiswa');
        return;
    }
    $('h1').html('Profil Mahasiswa ' + link);

    $.getJSON('./mhs.json', function (data) {
        let mhs = data.mahasiswa;
        let content = '';
        $.each(mhs, function (i, data) {
            if (data.jk == link) {
                content += '<div class="col-md-4 mb-3"><div class="card"><img src="' + data.foto +
                 '" class="card-img-top" alt="..." style="height: 250px; width: 100%;"><div class="card-body"><h5 class="card-title">' + data.nama + 
                 '</h5> <p class="card-text">Mahasiwa dengan NIM ' + data.nim + 
                 ' ini berasal dari ' + data.alamat_asal + 
                 '.</p><a href="javascript:void(0);" class="btn btn-info float-right" id="btn-detail" onClick="showDetail('+data.nim+')">Detail</a></div></div></div>';
            }
        });
        $('#list-profile').html(content);
    })
});

function showDetail(nim){
    console.log('Showdetil');
    $.getJSON('./mhs.json', function (data) {
        let mhs = data.mahasiswa;
        let content = '';
        $.each(mhs, function (i, data) {
            if (data.nim == nim) {
                content += '<div class="modal fade bd-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">'+
                '<div class="modal-dialog modal-xl">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<h5 class="modal-title" id="exampleModalLabel">Detail Mahasiswa</h5>'+
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<table class="table no-border">'+
                                '<tr><td rowspan="5"  style="width: 400px;"><img src="' + data.foto +
                                '" class="card-img-top" alt="..."></td><td>NIM</td><td>: '+data.nim+'</td></tr>'+
                                '<tr><td>Nama</td><td>: '+data.nama+'</td></tr>'+
                                '<tr><td>Jenis Kelamin</td><td>: '+data.jk+'</td></tr>'+
                                '<tr><td>Alamat Asal</td><td>: '+data.alamat_asal+'</td></tr>'+
                                '<tr><td>Alamat Malang</td><td>: '+data.alamat_mlg+'</td></tr>'+
                            '</table>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
              '</div>';
              console.log(data);
            }
        });
        $('#body').append(content);
        $('#myModal').modal('show');
    })
}

$(document).on('hidden.bs.modal', '.modal', function () { 
    $("#myModal").remove(); 
    $(".modal-dialog").remove(); 
});