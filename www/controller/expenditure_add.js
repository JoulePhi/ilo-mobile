$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
    $('#activity_expenditure_description').summernote({
        toolbar: [
          ['font', ['bold', 'underline', 'clear']],
          ['para', ['ul', 'ol']],
        ]
      });
    var sact_id =document.getElementById('expsact_id');
    var createdBy =document.getElementById('expcreatedBy');
    sact_id.value =localStorage.id_subac_detail;
    createdBy.value =localStorage.id;
});


function open_budget(t){
    var id = t.getAttribute('data-id');
    if(t.value == "" || t.value == null || t.value == undefined){
      document.getElementById(id).disabled = true;
    }else{
      document.getElementById(id).disabled = false;
    }
  }


function submitexp() {
    var expformData = new FormData(document.querySelector("form#add_expenditure_form"));

    var exptitle = document.getElementById('exptitle').value;
    var type_currency = document.getElementById('type_currency').value;
    var expbudget = document.getElementById('expbudget').value;
    var expdate = document.getElementById('expdate').value;
    var expdescription = document.getElementById('activity_expenditure_description').value;
//   console.log(type_currency);
    if(exptitle == '' || type_currency == '' || expbudget == '' || expdate == '' || expdescription == ''){
        Swal.fire({
            title: "Oops",
            text: "All fields must be filled",
            icon: "error"
        });
        return false;
    }else{

        $.ajax({
            type: "POST",
            url: url_endpoint + 'ajax_add_expenditure',
            data: expformData,
        // data: form,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data) {

            if (data.status == 'SUCCESS') {
                Swal.fire({
                    title: "Success",
                    text: "Success to add Activity Expenditure Budget",
                    icon: "success"
                });
                // location.reload();
                setInterval(function () {
                    location.reload();
                  }, 2000);
            } else {
                Swal.fire({
                    title: "Oops",
                    text: "Failed to add Activity Expenditure Budget, please try again later",
                    icon: "error"
                });
            }
        }
    });
}
}


if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}
