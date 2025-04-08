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
var dataExpenditure = [];
$(document).ready(function () {
    showExpenditure(localStorage.expenditure_idx);
});

function getbudget(type1){
    
    if( type1 == 'mandatory'){
        $.ajax({
            type: "GET",
            url: url_endpoint + "ajax_get_budget_expansive/" + localStorage.expenditure_idx,
            crossDomain: true,
            cache: false,
            success: function (data2) {
                
                if (data2.status == 'SUCCESS') {
                    dataExpenditure = data2['data'];
                }
            }
            
        });
    }
    

}

function showExpenditure(id) {
    $.ajax({
        url: url_endpoint+"ajax_get_expenditure_edit",
        type: 'GET',
        data: {id:id},
        crossDomain: true,
        cache: false,
        dataType: 'json',
        success: function (data) {
        // var data = JSON.parse(datax);
        if(data.status == "success"){
            // console.log(data.data['note']);
            var note = document.getElementById('note_area');
          note.innerHTML = data.data['note'];
          document.getElementById('activity_expenditure_id_revision').value = data.data['id'];
          document.getElementById('activity_expenditure_sact_id_revision').value = data.data['sub_activity_id'];
          document.getElementById('activity_expenditure_title_revision').value = data.data['title'];
          if(data.data['type_currency'] == 'rupiah'){
              document.getElementById('activity_expenditure_budget_revision').value = data.data['budget_rupiah'];
            }else{
              document.getElementById('activity_expenditure_budget_revision').value = data.data['budget'];
            }
            $("#type_currency_revision").val(data.data['type_currency']).change();
          document.getElementById('activity_expenditure_description_revision').innerHTML = data.data['description'];
          $('#activity_expenditure_description_revision').summernote({
              toolbar: [
                ['font', ['bold', 'underline', 'clear']],
                ['para', ['ul', 'ol']],
              ]
            });
          $('#activity_expenditure_description_revision').summernote('code', data.data['description']);
          document.getElementById('activity_expenditure_date_revision').value = data.data['date'];
        }else{
            Swal.fire({
                title: "Oops",
                text: "Something wrong",
                icon: "error"
            });
            // setInterval(function () {
            //     location.reload();
            //   }, 2000);
        }
      }
    });
}

function submitexprevision() {
    var expformData = new FormData(document.querySelector("form#revision_report_form"));

    var exptitle = document.getElementById('activity_expenditure_title_revision').value;
    var expbudget = document.getElementById('activity_expenditure_budget_revision').value;
    var type_currency = document.getElementById('type_currency_revision').value;
    var expdate = document.getElementById('activity_expenditure_date_revision').value;
    var expdescription = document.getElementById('activity_expenditure_description_revision').value;
    // console.log(exptitle);
    // console.log(type_currency);
    // console.log(expbudget);
    // console.log(expdate);
    // console.log(expdescription);
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
            url: url_endpoint + 'ajax_revision_expenditure',
            data: expformData,
        // data: form,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data) {

            if (data.status == 'SUCCESS') {
                Swal.fire({
                    title: "Success",
                    text: "Success to edit Activity Expenditure Budget",
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


function open_budget(t){
    var id = t.getAttribute('data-id');
    if(t.value == "" || t.value == null || t.value == undefined){
      document.getElementById(id).disabled = true;
    }else{
      document.getElementById(id).disabled = false;
    }
  }



if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}
