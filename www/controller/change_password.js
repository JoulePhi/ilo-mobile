$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }

    $("#changePasswordForm").on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: url_endpoint + "get_csrf",
            crossDomain: true,
            cache: false,
            success: function (datay) {
                var fd = new FormData($('#changePasswordForm')[0]);
                fd.append(datay['name'], datay['token']);
                // console.log(datay['token']);
                fd.append('id_user', localStorage.id);
                $.ajax({
                    type: "POST",
                    url: url_endpoint + "changePassword",
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: fd,
                    header: {
                        'Authorization': datay['token']
                    },
                    beforeSend: function () {
                        // $("#login").html('Please Wait...');
                    },
                    success: function (datax) {
                        // console.log(datax);
                        if (datax['status'] == "success") {
                            toastr.success(datax['message']);
                        } else if (datax['status'] == "error") {
                            toastr.error(datax['message']);
                        }
                    }
                });
            }
        });
        return false;
    });
});

function send() {
    var password_before = $("#password_before").val();
    var password = $("#password").val();
    var confirm_password = $("#confirm_password").val();
    if ($.trim(password_before).length > 0 & $.trim(password).length > 0 & $.trim(confirm_password).length > 0) {
        $.ajax({
            type: "GET",
            url: url_endpoint + "get_csrf",
            crossDomain: true,
            cache: false,
            success: function (datay) {
                var fd = new FormData($('#form-profile')[0]);
                fd.append(datay['name'], datay['token']);
                // console.log(datay['token']);
                fd.append('id_user', localStorage.id);
                $.ajax({
                    type: "POST",
                    url: url_endpoint + "change_password",
                    crossDomain: true,
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: fd,
                    header: {
                        'Authorization': datay['token']
                    },
                    beforeSend: function () {
                        $("#login").html('Please Wait...');
                    },
                    success: function (datax) {
                        // console.log(datax);
                        if (datax['status'] == "success") {
                            toastr.success(datax['message']);
                        } else if (datax['status'] == "error") {
                            toastr.error(datax['message']);
                        }
                    }
                });
            }
        });
    } else {
        toastr.error("Harap isi semua form");
    }
    return false;
}