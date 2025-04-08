$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
    // document.getElementById('ava').setAttribute('src', base_url_endpoint + 'assets/images/avatars/' + localStorage.photo);
});
var datax = "";
$(document).ready(function () {
    $('#createdBy').val(localStorage.id);
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_report_by_user?id_user=" + localStorage.id,
        crossDomain: true,
        cache: false,
        success: function (data) {
            datax = data;
            var html = '';
            if (data.status == 'SUCCESS') {
                console.log(data);
                for (let m = 0; m < data.data['report'].length; m++) {
                    
                    var status = data.data['report'][m]['status'];
                    var color = '';
                    if(status == 'approve'){
                        var color = '#45c4a0';

                    }else if(status == 'pending'){
                        var color = '#FF6F00';

                    }else if(status == 'rejected'){
                        var color = '#fa3c4b';
                    }


                    html += '<div class="row mb-5">';
                        html += '<div class="col-12" >';
                            html += '<div class="card shadow-xl border " style="box-shadow: 0px -5px '+color+' !important;">';
                                html += '<div class="card-header text-ilo-dark-blue pb-0 ps-5 pe-5" style="border:none !important;">';
                                    html += '<a href="javascript:void(0)" class="title-text"  onclick="initiative_report_detail(this)" data-report="' + data.data['report'][m]['id'] + '"><h6 class="text-dark " ><b><b>'+ data.data['report'][m]['title'] + '</b></b></h6></a>';
                                    html += '<div class="row">';
                                        html += '<div class="col-6 pe-1" style="border-right: 1px solid #d2d0d0;">';
                                            html += '<p class="card-text text-dark">';
                                                html += '<small>';
                                                    html += '<b class="row"><span >Date: </span><span class="text-primary">' + changeDateFormat2(data.data['report'][m]['date']) + '</span></b>';
                                                html += '</small>';
                                            html += '</p>';
                                        html += '</div>';
                                    html += '</div>';
                                    html += '<hr class="m-0 mt-2 mb-2">';
                                html += '</div>';
                                html += '<div class="card-body pt-0 ps-5 pe-5">';
                                    html += '<div class="row">';
                                        html += '<div class="col-12">';
                                            html += '<div class="row">';
                                                html += '<div class="col-12">';
                                                    html += '<p class="mb-0"><b class="text-ilo-dark-blue">Beneficiary:</b></p>';
                                                    html += '<p class="mb-0 text-dark fs-14">Male: ' + data.data['report'][m]['male'] + '</p><p class="mb-0 text-dark fs-14">Female: ' + data.data['report'][m]['female'] + '</p>';
                                                    html += '<p class="mt-3 mb-0"><b class="text-ilo-dark-blue">Locations:</b></p>';
                                                    html += '<div class="d-flex">';
                                                        html += '<div class="col-1">';
                                                            html += '<i class="uil uil-map-pin-alt col-2 p-1 text-ilo-dark-blue"></i>';
                                                        html += '</div>';
                                                        html += '<div class="col-10">';
                                                            html += '<ul class="mb-0 fs-10 ps-4">';
                                                                var type = "Kota"
                                                                if (data.data['report'][m]['type'] == 'Kabupaten') {
                                                                    type = 'Kab. ';
                                                                }
                                                                html += '<li class="fw-bold fs-12">' + type + ' ' + data.data['report'][m]['c_name'] + '</li>';
                                                                // html += 'listcity';
                                                            html += '</ul>';
                                                        html += '</div>';
                                                    html += '</div>';
                                                html += '</div>';
                                            html += '</div>';
                                            html += '<div class="row">';
                                                html += '<div class="col-12 text-center">';
                                                    html += '<button type="button" onclick="initiative_report_detail(this)" data-report="' + data.data['report'][m]['id'] + '" class="btn btn-danger btn-sm w-100 mt-5" style=" text-transform: capitalize;">'+ status +'</button>';
                                                html += '</div>';
                                            html += '</div>';
                                        html += '</div>';
                                    html += '</div>';
                                html += '</div>';
                            html += '</div>';
                        html += '</div >';
                    html += '</div >';
                }
                list_report.innerHTML = html;
            }
        }

    });
    
    if ($('#comment').length) {
        // $('#comment').summernote({
        //     toolbar: [
        //     ['font', ['bold', 'underline', 'clear']],
        //     ['para', ['ul', 'ol']],
        //     ]
        // });
        tinymce.init({
            selector: '#comment'
        });
    }
    
    if ($('#description').length) {
        // $('#description').summernote({
        //     toolbar: [
        //     ['font', ['bold', 'underline', 'clear']],
        //     ['para', ['ul', 'ol']],
        //     ]
        // });
        tinymce.init({
            selector: '#description'
        });
    }
  

    $("#add_report_form").on("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(document.querySelector("form#add_report_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'ajaxAddReportIniciative',
            data: formData,
            // data: form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(data) {
                if (data.status == 'success') {
                    location.reload();
                } else {
                    Swal.fire({
                        title: "Add Report Failed",
                        text: "Failed to add report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });

    
if ($('#location').length) {
    getlocation();
}
});



  function getlocation() {
    
    $.ajax({
        url: url_endpoint + 'ajaxGetLocation',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#location").html('');
            $.each(data, function (index, value) {
                var html = '<option value="' + value.id + '">' + value.text + '</option>';
                $("#location").append(html);
            });
        }
    });
    
    $("#location").select2({
        dropdownParent: $('#add_report_form>.modal-body>.row')
    });
  }



function add_attachment() {
    var rows = document.getElementById("attachment_field").rows;
    var id_m = 1;
    if (rows.length > 0) {
        id_m = (parseInt(rows[rows.length - 1].id.split("_")[1]) + 1);
    }
    var html = '';
    html += '<tr id="attachment_' + id_m + '">';
        html += '<td>';
            html += '<div class="row d-flex justify-content-between mb-3">';
                html += '<div class="col-10 my-auto ps-0">';
                    html += '<input type="file" style="font-size:0.81rem !important;" class="form-control form-control-sm mb-2" name="attachment[]" accept="image/*, application/pdf" required>';
                    html += '<input type="text" style="font-size:0.81rem !important;" class="form-control form-control-sm" name="short_description[]" placeholder="short description..." required>';
                html += '</div>';
                html += '<div class="col-2 ps-0  p-0 m-0">';
                    html += '<button type="button" class="btn btn-danger btn-sm w-100 h-100 px-1" onclick="del_attachment_field(' + id_m + ')"><i class="uil uil-trash fs-20"></i></button>';
                html += '</div>';
            html += '</div>';
        html += '</td>';
    html += '</tr>';
    $("#attachment_field").append(html);
}

function del_attachment_field(params) {
    var par = 'attachment_'+params;
    var rows = document.getElementById("attachment_field").rows;
    var length = rows.length;
    if (length > 0) {
        var rows = document.getElementById(par);
        rows.remove();
    }
};

if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}

function sendcomment() {
    var comment = tinyMCE.get('comment').getContent();
    let timeout = null;
    var button = $('#bsubmit');
    setLoadingButton($(button), true, '<span class="eos-icons--bubble-loading"></span>');
    if ($.trim(comment).length < 1) {
        toastr.error('Please fill in comment column');
        setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
    } else {
        tinyMCE.get('comment').save();
        var jqXHR1 = $.ajax({
            type: "GET",
            url: url_endpoint + "get_csrf",
            crossDomain: true,
            cache: false,
            beforeSend: function () {
                timeout = setTimeout(function () {
                    toastr.error('Bad signal, please check your connection');
                    setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
                    jqXHR1.abort();
                }, 2000);
            },
            success: function (datay) {
                clearTimeout(timeout);
                var fd = new FormData($('#form_comment')[0]);
                fd.append('sub_activity_id', localStorage.id_subac_detail);
                fd.append('sub_activity_report_id', 0);
                fd.append('created_by', localStorage.id);
                fd.append(datay['name'], datay['token']);
                let jqXHR2 = $.ajax({
                    url: url_endpoint + 'send_comment',
                    type: "POST",
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: fd,
                    beforeSend: function () {
                        timeout = setTimeout(function () {
                            toastr.error('Bad signal, please check your connection');
                            setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
                            jqXHR2.abort();
                        }, 2000);
                    },
                    success: function (data) {
                        clearTimeout(timeout);
                        setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
                        if (data['status'] == "SUCCESS") {
                            toastr.success(data['message']);
                            var allcomment = document.getElementById('allcomment');
                            var a_c_html = '';
                            a_c_html += '<div class="row mt-3 justify-content-center">' +
                                '<div class="col-11 mb-2 px-0">' +
                                '<div class="card border shadow shadow-lg">' +
                                '<div class="card-header px-5 py-3">' +
                                '<div class="row">' +
                                '<div class="col-2 d-flex justify-content-center">' +
                                '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + localStorage.photo + '" alt="" width="40" height="40">' +
                                '</div>' +
                                '<div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">' +
                                '<b class="mb-0 fs-12 text-dark col-12"> You </b>' +
                                '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' + changeDateFormat(new Date) +
                                '</span > ' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
                                '<div class="fs-12 mb-0">' +
                                comment +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                                $("#allcomment").prepend(a_c_html);
                                tinyMCE.get('comment').setContent('');
                        } else {
                            toastr.error(data['message']);
                        }
                    },
                    error: function (xhr, status, error) {
                        clearTimeout(timeout);
                        toastr.error(error);
                        clearTimeout(timeout);
                        setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
                    }
                });
            },
            error: function (xhr, status, error) {
                clearTimeout(timeout);
                toastr.error(error);
                clearTimeout(timeout);
                setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
            }
        });
    }
    return false;
}

function initiative_report_detail(t) {
    var id = t.getAttribute('data-report');
    // console.log(id);
    localStorage.id_subac_report = id;
    window.location.href = "initiative_report_detail.html";
}