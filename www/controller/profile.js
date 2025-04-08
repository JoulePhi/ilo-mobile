$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
    $.ajax({
        type: "GET",
        url: url_endpoint+"getProfile"+"?id_user="+localStorage.id,
        crossDomain: true,
        cache: false,
        success: function(data){
            $('#usersAvatar').attr('src', base_url_endpoint + 'assets/images/avatars/' + data.photo);
            $('#name').val(data.name);
            $('#email').val(data.email);
            $('#phone').val(data.phone);
            $('#gender').val(data.gender).change();
        }
    });

    form_profile
    $("#form_profile").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="updatedBy" value="'+localStorage.id+'" /> ');
        var formData = new FormData(document.querySelector("form#form_profile"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateProfile',
            data: formData,
            // data: form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(data) {
                if (data.status == 'success') {
                    $('#usersAvatar').attr('src', base_url_endpoint + 'assets/images/avatars/' + data.data.photo);
                    $('#avatar').val('');
                    // $('#name').val(data.data.name);
                    // $('#email').val(data.data.email);
                    // $('#phone').val(data.data.phone);
                    toastr.success('Your profile has been update');
                } else {
                    toastr.error('Update profile failed!');
                }
            }
        });
    });
});

function send() {
    toastr.success('Your profile has been update');
}

// function send() {
//     $.ajax({
//         type: "GET",
//         url: url_endpoint + "get_csrf",
//         crossDomain: true,
//         cache: false,
//         success: function (datay) {
//             var fd = new FormData($('#form_profile')[0]);
//             fd.append('id_user', localStorage.id);
//             fd.append(datay['name'], datay['token']);
//             $.ajax({
//                 type: "POST",
//                 url: url_endpoint + 'update_profile',
//                 crossDomain: true,
//                 cache: false,
//                 contentType: false,
//                 processData: false,
//                 data: fd,
//                 header: {
//                     'Authorization': datay['token']
//                 },
//                 success: function (datax) {
//                     if (datax['status'] == "success") {
//                         var email = datax['datasave']['email'];
//                         var id_dpc = datax['datasave']['id_dpc'];
//                         var id_pk = datax['datasave']['id_pk'];
//                         var name = datax['datasave']['name'];
//                         var role = datax['datasave']['role'];
//                         var fotoimg = document.getElementById('foto-image');
//                         if (datax['datasave']['image'] == "" || datax['datasave']['image'] == null || datax['datasave']['image'] == undefined) {
//                         } else {
//                             var bgimgx = "url('" + base_url_endpoint + "uploads/user/" + datax['datasave']['image'] + "')";
//                             fotoimg.innerHTML = '<div class=""style="border-radius:50%; width:120px; height:120px;background-image:' + bgimgx + '; background-repeat: no-repeat;background-size:cover;background-position: center;"></div>';
//                         }
//                         localStorage.email = email;
//                         localStorage.id_dpc = id_dpc;
//                         localStorage.id_pk = id_pk;
//                         localStorage.name = name;
//                         localStorage.role = role;
//                         toastr.success(datax['message']);
//                     } else {
//                         toastr.error(datax['message']);
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     // console.error(status);
//                     console.error(error);
//                 }
//             });
//         }
//     });
// }

function isImageFile(fileName) {
    return /(\.jpg|\.Jpg|\.JPG|\.jpeg|\.Jpeg|\.JPEG|\.png|\.Png|\.PNG)$/i.test(fileName);
}

function cpk(param, id) {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_home?id_user=" + localStorage.id,
        // data: "email="+email+"&password="+password,
        crossDomain: true,
        cache: false,
        success: function (data) {
            var id_pk = $(param).val();
            if (id_pk) {
                console.log('okok');
                id_pk = $(param).val();
            } else {
                console.log('okok2');
                id_pk = id;
            }
            if (id_pk !== null) {
                var pk_id_dpc = 0;
                var datapk = data['pk'];
                // console.log(id_pk);
                for (var jml_pkx = 0; jml_pkx < datapk.length; jml_pkx++) {
                    if (datapk[jml_pkx]['id_pk'] == id_pk) {
                        console.log(datapk[jml_pkx]['id_pk']);
                        pk_id_dpc = datapk[jml_pkx]['id_dpc'];
                        console.log(pk_id_dpc);
                    }
                }
                var datadpc = data['dpc'];
                // console.log(datadpc);
                var nama_dpc = "";
                var id_dpc = "";
                var dpc_id_dpd = "";
                for (var jml_pkx = 0; jml_pkx < datadpc.length; jml_pkx++) {
                    // console.log(datadpc[jml_pkx]['id']);
                    if (datadpc[jml_pkx]['id_dpc'] == pk_id_dpc) {
                        // console.log(datadpc[jml_pkx]['id_dpc']);
                        // console.log(pk_id_dpc);
                        nama_dpc = datadpc[jml_pkx]['name_dpc'];
                        id_dpc = datadpc[jml_pkx]['id_dpc'];
                        dpc_id_dpd = datadpc[jml_pkx]['id_dpd'];
                        // console.log(nama_dpc);
                        // console.log(id_dpc);
                        // console.log(document.getElementById('dataserikat'));
                        // console.log('ok1');
                    }
                }
                var datadpd = data['dpd'];
                console.log(data);
                var nama_dpd = "";
                var id_dpd = "";
                for (var jml_pkx = 0; jml_pkx < datadpd.length; jml_pkx++) {
                    // console.log(datadpd[jml_pkx]['id']);
                    if (datadpd[jml_pkx]['id_dpd'] == dpc_id_dpd) {
                        // console.log(datadpd[jml_pkx]['id_dpd']);
                        // console.log(pk_id_dpd);
                        nama_dpd = datadpd[jml_pkx]['name_dpd'];
                        id_dpd = datadpd[jml_pkx]['id_dpd'];
                        // console.log(nama_dpd);
                        // console.log(id_dpd);
                        // console.log(document.getElementById('dataserikat'));
                        // console.log('ok1');
                    }
                }
                if (nama_dpc == undefined || nama_dpc == "" || nama_dpc == null || nama_dpd == undefined || nama_dpd == "" || nama_dpd == null) {
                    console.log("errorx");
                } else {
                    document.getElementById('dataserikat').innerHTML = "Pada DPD: " + nama_dpd + " | Pada DPC: " + nama_dpc;
                    document.getElementById('dpc').value = id_dpc;
                    document.getElementById('dpd').value = id_dpd;
                }
                // console.log(id_dpc);
                // console.log(id_dpc);
                // var pk = datapk.find(x => x.id_pk === id_pk);
                // var founddpc = datadpc.find(x => x.id_dpc === pk_id_dpc);
                // console.log(nama_dpc);
            }
        }
    });
}