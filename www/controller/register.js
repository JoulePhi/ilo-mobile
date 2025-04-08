$(document).ready(function () {
	var userid = localStorage.id;
	if (userid != null && userid != "undefined") {
		var base_url = base_urlx();
		window.location.href = "activity.html";
	}

    $("#register_form").on("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(document.querySelector("form#register_form"));
        $.ajax({
            type: "POST",
            url: url_endpoint + 'register',
            data: formData,
            // data: form,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(data) {
                console.log(data);
                if (data.status == 'success') {
                    Swal.fire({
                        title: "Success",
                        // text: "Registration success, please wait/contact admin for activate your account",
                        text: data.message,
                        icon: "success"
                    });
                    Swal.fire({
                        title: "Success",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "index.html";
                        } else {
                            window.location.href = "index.html";
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Failed",
                        // text: "Registration failed, please try again later",
                        text: data.message,
                        icon: "error"
                    });
                }
            }
        });
    });
});

toastr.options = {
	"closeButton": true,
	"newestOnTop": false,
	"progressBar": true,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}

function checkcpw(params) {
    var x = $('#confirm_password').val();
    if (x !== '' && x !== null) {
        if (params !== x) {
            $('#pwmessage').css('display', 'block');
            $('#btn-register').css('display', 'none');
        } else {
            $('#pwmessage').css('display', 'none');
            $('#btn-register').css('display', 'block');
        }
    }
}

function checkpw(params) {
    var x = $('#password').val();
    if (x !== '' && x !== null) {
        if (params !== x) {
            $('#cpwmessage').css('display', 'block');
            $('#btn-register').css('display', 'none');
        } else {
            $('#cpwmessage').css('display', 'none');
            $('#btn-register').css('display', 'block');
        }
    }
}