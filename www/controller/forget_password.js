$(document).ready(function () {
	var userid = localStorage.id;
	if (userid != null && userid != "undefined") {
		var base_url = base_urlx();
		window.location.href = "activity.html";
	}

	$("#myForm").on("submit", function(event) {
		event.preventDefault();
		$.ajax({
			type: "GET",
			url: url_endpoint + "get_csrf",
			crossDomain: true,
			cache: false,
			success: function (datay) {
				var fd = new FormData($('#myForm')[0]);
				fd.append(datay['name'], datay['token']);
				$.ajax({
					url: url_endpoint + 'forgetPassword',
					type: "POST",
					crossDomain: true,
					cache: false,
					contentType: false,
					processData: false,
					data: fd,
					beforeSend: function () {
						// $("#login").html('Please Wait...');
					},
					success: function (data) {
						if (data['status'] == "success") {
							toastr.success(data['message']);
						} else if (data['status'] == "error") {
							toastr.error(data['message']);
						}
					}
				});
			}
		});
		return false;
    });
});

// function forget() {
// 	var email = $("#email").val();
// 	// var password = $("#password").val();
// 	if ($.trim(email).length > 0) {
// 		$.ajax({
// 			type: "GET",
// 			url: url_endpoint + "get_csrf",
// 			crossDomain: true,
// 			cache: false,
// 			success: function (datay) {
// 				var fd = new FormData($('#myForm')[0]);
// 				fd.append(datay['name'], datay['token']);
// 				$.ajax({
// 					url: url_endpoint + 'forgetPassword',
// 					type: "POST",
// 					crossDomain: true,
// 					cache: false,
// 					contentType: false,
// 					processData: false,
// 					data: fd,
// 					beforeSend: function () {
// 						// $("#login").html('Please Wait...');
// 					},
// 					success: function (data) {
// 						if (data['status'] == "success") {
// 							toastr.success(data['message']);
// 						} else if (data['status'] == "error") {
// 							toastr.error(data['message']);
// 						}
// 					}
// 				});
// 			}
// 		});
// 	} else {
// 	}
// 	return false;
// }