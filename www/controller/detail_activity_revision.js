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
        url: url_endpoint + "get_data_sub_activities_detail2?id_subac_detail=" + localStorage.id_subac_detail,
        crossDomain: true,
        cache: false,
        success: function (data) {
            datax = data;
            if (data.status == 'SUCCESS') {
                $('#sact_id').val(localStorage.id_subac_detail);
                $('#createdBy').val(localStorage.id);
                document.getElementById('note').innerHTML = data.data['dactivity'][0]['note'];
                $('#title').val(data.data['dactivity'][0]['sub_tit']);
                $('#description').val(data.data['dactivity'][0]['sub_desc']);
                // tinymce.get('description').setContent(data.data['dactivity'][0]['sub_desc']);
                tinymce.init({
                    selector: '#description'
                });
                tinymce.get('description').setContent(data.data['dactivity'][0]['sub_desc']);
                $('#start_date').val(data.data['dactivity'][0]['start_date']);
                $('#due_date').val(data.data['dactivity'][0]['due_date']);
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

    $.ajax({
        url: url_endpoint + 'ajaxGetLocation',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#location").html('');
            var arr_c = [];
            $.each(data, function (index, value) {
                var html = '<option value="' + value.id + '">' + value.text + '</option>';
                $("#location").append(html);
            });
            $.ajax({
                url: url_endpoint + 'ajaxGetLocationBySact',
                type: 'GET',
                data: { sact: localStorage.id_subac_detail },
                dataType: 'json',
                success: function (data) {
                    var arr_c = [];
                    $.each(data, function (index, value) {
                        arr_c[index] = value.id;
                    });
                    console.log(arr_c);
                    $('#location').val(arr_c).change();
                }
            });
        }
    });

    $("#form_revision_act").on("submit", function(event) {
        event.preventDefault();
        tinyMCE.triggerSave(true,true);
        var formData = new FormData(document.querySelector("form#form_revision_act"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'ajaxRevisionAct',
            data: formData,
            // data: form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(data) {
                if (data.status == 'success') {
                    window.location.href = "activity.html";
                } else {
                    Swal.fire({
                        title: "Revision Failed",
                        text: "Failed, please try again later",
                        icon: "error"
                    });
                }
            }
        });
    });
});