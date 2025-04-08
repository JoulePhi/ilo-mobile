$(document).ready(function () {
  var userid = localStorage.id;
  if (userid != null && userid != "undefined") {
    var base_url = base_urlx();
    window.location.href = "activity.html";
  }
});
toastr.options = {
  closeButton: true,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

function login() {
  console.log("test");
  var email = $("#email").val();
  var password = $("#password").val();
  if (($.trim(email).length > 0) & ($.trim(password).length > 0)) {
    $.ajax({
      type: "GET",
      url: url_endpoint + "get_csrf",
      crossDomain: true,
      cache: false,
      success: function (datay) {
        var fd = new FormData($("#myForm")[0]);
        fd.append(datay["name"], datay["token"]);
        $.ajax({
          url: url_endpoint + "login_mobile",
          type: "POST",
          crossDomain: true,
          cache: false,
          contentType: false,
          processData: false,
          data: fd,
          beforeSend: function () {
            $("#login").html("Please Wait...");
          },
          success: function (data) {
            if (data["status"] == "SUCCESS") {
              var id = data["datasave"]["id"];
              var email = data["datasave"]["email"];
              var name = data["datasave"]["name"];
              var role_id = data["datasave"]["role_id"];
              var leader = data["datasave"]["leader"];
              var status = data["datasave"]["status"];
              var photo = data["datasave"]["photo"];

              localStorage.id = id;
              localStorage.email = email;
              localStorage.name = name;
              localStorage.role_id = role_id;
              localStorage.leader = leader;
              localStorage.status = status;
              localStorage.photo = photo;
              localStorage.wellcome = "ok";
              localStorage.timeLogin = new Date();
              localStorage.isLoggedIn = "true";
              window.location.href = "activity.html";
            } else if (data["status"] == "ERROR") {
              toastr.error(data["message"]);
            }
          },
        });
      },
    });
  } else {
    toastr.error("Please fill in all columns");
  }
  return false;
}
