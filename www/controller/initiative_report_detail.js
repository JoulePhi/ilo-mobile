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
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_initiative_report_byid?id_subac_report=" + localStorage.id_subac_report,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data.status == 'SUCCESS') {
                document.getElementById('rtitle').innerHTML = data.data['detail'][0]['title'];

                var status = data.data['detail'][0]['status'];
                    var rstatus = '';
                    if(status == 'approve'){
                        rstatus = '<span class="badge badge-success bg-success">Approve</span>';

                    }else if(status == 'pending'){
                        rstatus = '<span class="badge badge-orange bg-orange">Pending</span>';
                    }else if(status == 'rejected'){
                        rstatus = '<span class="badge badge-danger bg-danger">Rejected</span>';
                    }

                    document.getElementById('rstatus').innerHTML = rstatus; 

                if (data.data['detail'][0]['status'] == 'rejected') {
                    $('#btn-resubmit').html('<button class="btn btn-warning btn-sm w-100" data-id="'+localStorage.id_subac_report+'" id="btn-resubmit-report">Resubmit Report</button>');
                    $('#notes_from_admin').html('<p>'+data.data['detail'][0]['notes']+'</p>');
                    $('#notes_row').css('display', 'block');
                } else {
                    $('#btn-resubmit').html('');
                    $('#notes_from_admin').html('');
                    $('#notes_row').css('display', 'none');
                }
                if (data.data['detail'][0]['created_by'] == localStorage.id) {
                    document.getElementById('edesc').innerHTML = '<a href="javascript:void(0);" onclick="edit_description_report()"><i class="uil uil-pen ms-2"></i></a>';
                    document.getElementById('rdesc').innerHTML = data.data['detail'][0]['description'];
                    $('#edit_report_title_btn').css('display', 'block');
                    $('#edit_report_location_btn').css('display', 'block');
                    $('#add_attachment_form_btn').css('display', 'block');
                } else {
                    $('#edit_report_title_btn').css('display', 'none');
                    $('#edit_report_location_btn').css('display', 'none');
                    $('#add_attachment_form_btn').css('display', 'none');
                    document.getElementById('rdesc').innerHTML = data.data['detail'][0]['description'];
                }
                document.getElementById('rmale').innerHTML = data.data['detail'][0]['male'];
                document.getElementById('rfemale').innerHTML = data.data['detail'][0]['female'];
                document.getElementById('totalg').innerHTML =  parseInt(data.data['detail'][0]['male']) + parseInt(data.data['detail'][0]['female']);
                document.getElementById('rcreated').innerHTML = changeDateFormat2(data.data['report'][0]['created_at']);
                document.getElementById('rby').innerHTML = '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + data.data['report'][0]['photo'] + '" alt="" width="30" height="30"><b class="col-11 p-0 ps-2 fs-12 text-dark" style="align-content:center">' + data.data['report'][0]['name'] + '</b>';
                // var listachievement = document.getElementById('listachievement');
                var listcity = document.getElementById('listcity');
                var listattachment = document.getElementById('listattachment');
                var list_gallery = document.getElementById('list_gallery');
                // var allcomment = document.getElementById('allcomment');
                // for (let i = 0; i < data.data['report'].length; i++) {
                //     if (data.data['detail'][0]['created_by'] == localStorage.id) {
                //         listachievement.innerHTML += ' <span class="col-10 fs-12 mb-2">' + data.data['report'][i]['measures'] + ' ' + data.data['report'][i]['unit'] + '. by ' + changeDateFormat3(data.data['report'][i]['timeline']) + ' | Achieve ' + data.data['report'][i]['achievment'] + ' ' + data.data['report'][i]['unit'] +'</span> <span class="col-2 fs-12 mb-2">'+'<a href="javascript:void(0);" onclick="edit_achievement_report('+data.data['report'][i]['sard_id']+')"><i class="uil uil-pen"></i></a>'+'</span>';
                //     } else {
                //         listachievement.innerHTML += ' <span class="col-10 fs-12 mb-2">' + data.data['report'][i]['measures'] + ' ' + data.data['report'][i]['unit'] + '. by ' + changeDateFormat3(data.data['report'][i]['timeline']) + ' | Achieve ' + data.data['report'][i]['achievment'] + ' ' + data.data['report'][i]['unit'];
                //     }
                // }
                for (let j = 0; j < data.data['city'].length; j++) {
                    var type = "Kota"
                    if (data.data['city'][j]['type'] == 'Kabupaten') {
                        type = 'Kab. ';
                    }
                    listcity.innerHTML += '<b class="col-12 fs-11" style="align-content:center">' + type + ' ' + data.data['city'][j]['city'] + '</b>'
                }
                for (let k = 0; k < data.data['attachment'].length; k++) {
                    if (data.data['detail'][0]['created_by'] == localStorage.id) {
                        var f = data.data['attachment'][k]['attachment'];
                        var file = f.replace(/ /g, "_");
                        listattachment.innerHTML += '<div class="col-10"><a class="d-flex flex-wrap mt-2 mb-1" href="' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + file + '" target="_blank">' + '<i class="uil uil-file-contract col-1 text-danger"></i >' + '<b class="col-11 p-0 fs-12" style="align-content:center">' + data.data['attachment'][k]['attachment'] + '</b>' + '</a ></div><div class="col-2 d-flex justify-content-end"><button type="button" class="btn btn-danger btn-sm px-2 py-1 my-auto" onclick="del_attachment('+data.data['attachment'][k]['id']+')"><i class="uil uil-trash-alt"></i></button></div>';
                        if (data.data['attachment'].length > 1 && k < data.data['attachment'].length - 1) {
                            listattachment.innerHTML += '<br/><hr class="mb-1 col-12 mt-0">';
                        }
                    } else {
                        var f = data.data['attachment'][k]['attachment'];
                        var file = f.replace(/ /g, "_");
                        listattachment.innerHTML += '<div class="col-10"><a class="d-flex flex-wrap mt-2 mb-1" href="' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + file + '" target="_blank">' + '<i class="uil uil-file-contract col-1 text-danger"></i >' + '<b class="col-11 p-0 fs-12" style="align-content:center">' + data.data['attachment'][k]['attachment'] + '</b>' + '</a ></div><div class="col-2 d-flex justify-content-end"></div>';
                        if (data.data['attachment'].length > 1 && k < data.data['attachment'].length - 1) {
                            listattachment.innerHTML += '<br/><hr class="mb-1 col-12 mt-0">';
                        }
                    }
                }
                for (let l = 0; l < data.data['gallery'].length; l++) {
                    if (data.data['detail'][0]['created_by'] == localStorage.id) {
                        list_gallery.innerHTML += '<div class="col-6 mb-5"><div class="row"><div class="col-12 mb-2 d-flex justify-content-center">' + '<img style="width:150px !important;height:150px !important;object-fit:cover;" class="rounded" onclick="opgallery(`' +  base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][l]['attachment'] + '`)" src="' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][l]['attachment'] + '" alt = "" > ' + '</div><div class="col-12"><button type="button" class="btn btn-danger btn-sm px-2 py-1 mt-auto w-100" onclick="del_attachment('+data.data['gallery'][l]['id']+')"><i class="uil uil-trash-alt"></i></button></div></div></div>';
                    } else {
                        list_gallery.innerHTML += '<div class="col-6 mb-5"><div class="row"><div class="col-12 mb-2 d-flex justify-content-center">' + '<img style="width:150px !important;height:150px !important;object-fit:cover;" class="rounded" onclick="opgallery(`' +  base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][l]['attachment'] + '`)" src="' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][l]['attachment'] + '" alt = "" > ' + '</div><div class="col-12"></div></div></div>';
                    }
                }
                // for (let m = 0; m < data.data['comment'].length; m++) {
                //     var name = data.data['comment'][m]['name'];
                //     if (data.data['comment'][m]['created_by'] == localStorage.id) {
                //         name = 'You';
                //     }
                //     allcomment.innerHTML += '<div class="row mt-3 justify-content-center">' +
                //         '<div class="col-11 mb-2 px-0">' +
                //         '<div class="card border shadow shadow-lg">' +
                //         '<div class="card-header px-5 py-3">' +
                //         '<div class="row">' +
                //         '<div class="col-2 d-flex justify-content-center">' +
                //         '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + data.data['comment'][m]['photo'] + '" alt="" width="40" height="40">' +
                //         '</div>' +
                //         '<div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">' +
                //         '<b class="mb-0 fs-12 text-dark col-12" > ' + name + '</b>' +
                //         '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' + changeDateFormat(data.data['comment'][m]['created_at']) + '</span > ' +
                //         '</div>' +
                //         '</div>' +
                //         '</div>' +
                //         '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
                //         '<div class="fs-12 mb-0">' +
                //         data.data['comment'][m]['comment'] +
                //         '</div>' +
                //         '</div>' +
                //         '</div>' +
                //         '</div>' +
                //         '</div>';
                // }
            } else {
                toastr.success(data['message']);
            }
            return false;
        }
    });

    // $.ajax({
    //     url: url_endpoint + 'get_data_location',
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function (data) {
    //         $("#location_edit").html('');
    //         $.each(data, function (index, value) {
    //             var html = '<option value="' + value.id + '">' + value.text + '</option>';
    //             $("#location_edit").append(html);
    //         });
    //     }
    // });

    if ($('#description_edit').length) {
        // $('#description_edit').summernote({
        //     toolbar: [
        //     ['font', ['bold', 'underline', 'clear']],
        //     ['para', ['ul', 'ol']],
        //     ]
        // });
        tinymce.init({
            selector: '#description_edit'
        });
    }

    $(document).on("click","#btn-resubmit-report",function() {
        var id_rep = $(this).attr('data-id');
        $.ajax({
            type: "POST",
            url: url_endpoint + 'resubmitReport',
            data: { 
                id: id_rep,
                id_user:localStorage.id
            },
            // data: form,
            // dataType: 'json',
            // contentType: false,
            // processData: false,
            success: function(data) {
                var datax = JSON.parse(data);
                if (datax.status == 'success') {
                    location.reload();
                } else {
                    Swal.fire({
                        title: "Resubmit Failed",
                        text: "Failed to resubmit report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });

    $("#edit_title_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        $(this).append('<input type="hidden" name="sact_report_id" value="'+localStorage.id_subac_report+'" /> ');
        var formData = new FormData(document.querySelector("form#edit_title_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateReportTitle',
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
                        title: "Update Failed",
                        text: "Failed to update title report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
    
    $("#edit_male_female_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        $(this).append('<input type="hidden" name="sact_report_id" value="'+localStorage.id_subac_report+'" /> ');
        var formData = new FormData(document.querySelector("form#edit_male_female_form"));
        
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateReportMaleFemale',
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
                        title: "Update Failed",
                        text: "Failed to update report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
    
    $("#edit_description_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        $(this).append('<input type="hidden" name="sact_report_id" value="'+localStorage.id_subac_report+'" /> ');
        var formData = new FormData(document.querySelector("form#edit_description_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateReportDescription',
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
                        title: "Update Failed",
                        text: "Failed to update description report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
    
    $("#edit_location_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        $(this).append('<input type="hidden" name="sact_report_id" value="'+localStorage.id_subac_report+'" /> ');
        var formData = new FormData(document.querySelector("form#edit_location_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateReportLocation',
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
                        title: "Update Failed",
                        text: "Failed to update location report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
    
    $("#edit_achievement_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        var formData = new FormData(document.querySelector("form#edit_achievement_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'updateReportAchievement',
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
                        title: "Update Failed",
                        text: "Failed to update achievement report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
    
    $("#attachment_field_form").on("submit", function(event) {
        event.preventDefault();
        $(this).append('<input type="hidden" name="createdBy" value="'+localStorage.id+'" /> ');
        $(this).append('<input type="hidden" name="sact_report_id" value="'+localStorage.id_subac_report+'" /> ');
        var formData = new FormData(document.querySelector("form#attachment_field_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'addReportAttachment',
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
                        title: "Add Failed",
                        text: "Failed to add achievement report, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
});
if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}
function edit_title_report() {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_title_sub_activities_report?id_subac_report=" + localStorage.id_subac_report,
        crossDomain: true,
        cache: false,
        success: function (data) {
            $('#title_edit').val(data.title);
            $("#edit_title_report").modal('show');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function edit_male_female_report() {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_male_female_sub_activities_report?id_subac_report=" + localStorage.id_subac_report,
        crossDomain: true,
        cache: false,
        success: function (data) {
            $('#male_edit').val(data.male);
            $('#female_edit').val(data.female);
            $("#edit_male_female_report").modal('show');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function edit_description_report() {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_description_sub_activities_report?id_subac_report=" + localStorage.id_subac_report,
        crossDomain: true,
        cache: false,
        success: function (data) {
            // $('#description_edit').val(data.description);
            $(tinymce.get('description_edit').getBody()).html(data.description);
            $("#edit_description_report").modal('show');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function edit_location_report() {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_location_sub_activities_report2?id_subac_report=" + localStorage.id_subac_report,
        crossDomain: true,
        cache: false,
        success: function (data) {
            console.log(data.location);
            var html = '';
            var type = 'Kota ';
            $('#location_edit').html('');
            $.each(data.data_location, function(index, value) {
                if (value.type == 'Kabupaten') {
                    type = 'Kab. ';
                }
                html += '<option value="'+value.id+'">'+type+value.name+'</option>';
            });
            $("#location_edit").append(html);
            $("#location_edit").val(data.location).change();
            $("#edit_location_report").modal('show');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function edit_achievement_report(params) {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_achievement_sub_activities_report?sard_id=" + params,
        crossDomain: true,
        cache: false,
        success: function (data) {
            $('#sard_id_edit').val(data.sard_id);
            $('#milestone_edit').val(data.milestone);
            $('#achievement_edit').val(data.achievement);
            $("#edit_achievement_report").modal('show');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}

function add_attachment_field(params) {
    var rows = document.getElementById("attachment_field").rows;
    var id_m = (parseInt(rows[rows.length - 1].id.split("_")[1]) + 1);
    var html = '';
    html += '<tr id="attachment_'+id_m+'">';
        html += '<td>';
            html += '<div class="row mb-2">';
                html += '<div class="col-10 px-0">';
                    html += '<input class="form-control" type="file" name="attachment[]" accept="image/*, application/pdf">';
                html += '</div>';
                html += '<div class="col-2 d-flex justify-content-end p-0">';
                    html += '<button type="button" class="btn btn-danger btn-sm px-2 py-1 w-100" onclick="del_attachment_field('+id_m+')"><i class="uil uil-trash-alt fs-20"></i></button>';
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
    if (length > 1) {
        var rows = document.getElementById(par);
        rows.remove();
    }
};

function del_attachment(params) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            type: "POST",
            url: url_endpoint + "del_attachment",
            data: {
              id:params
            },
            tryCount : 0,
            retryLimit : 5,
            success: function(data) {
              var dataxx = JSON.parse(data);
              console.log(dataxx);
              if (dataxx.status == 'success') {
                Swal.fire({
                    title: "Delete data success!",
                    text: "Data deleted successfully",
                    icon: "success"
                });
                location.reload();
              } else {
                error_notify('Failed delete attachment, please try again later.');
              }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
              this.tryCount++;
              if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
              } else {
                error_notify('Failed delete attachment, please try again later.');
                return;
              }    
              return;
            } 
          });
        }
      });
};

function detailactivity(t) {
    var id = t.getAttribute('data-detail');
    localStorage.id_detail_grievance = id;
    var base_url = base_urlx();
    window.location.href = "detail_activity.html";
}
function opgallery(src) {
    document.getElementById('showgallery').setAttribute('src', src);
    $("#gallery").modal('show');
}

function sendcomment() {
    var comment = $('#comment').val();
    let timeout = null;//loading
    var button = $('#bsubmit');
    setLoadingButton($(button), true, '<span class="eos-icons--bubble-loading"></span>');
    if ($.trim(comment).length < 1) {
        toastr.error('Please fill in comment column');
        setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
    } else {
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
                fd.append('sub_activity_report_id', localStorage.id_subac_report);
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
                            allcomment.innerHTML += '<div class="row mt-3 justify-content-center">' +
                                '<div class="col-11 mb-2 px-0">' +
                                '<div class="card border shadow shadow-lg">' +
                                '<div class="card-header px-5 py-3">' +
                                '<div class="row">' +
                                '<div class="col-2 d-flex justify-content-center">' +
                                '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + localStorage.photo + '" alt="" width="40" height="40">' +
                                '</div>' +
                                '<div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">' +
                                '<b class="mb-0 fs-12 text-dark col-12" > You </b>' +
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
                            $('#comment').val('');
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