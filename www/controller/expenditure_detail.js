$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
    // console.log($('#activity_expenditure_description'));
    $('#activity_expenditure_description').summernote({
        toolbar: [
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'ol']],
        ]
    });
    var sact_id = document.getElementById('expsact_id');
    var createdBy = document.getElementById('expcreatedBy');
    sact_id.value = localStorage.id_subac_detail;
    createdBy.value = localStorage.id;
});
var dataExpenditure = [];
$(document).ready(function () {
    showExpenditure(localStorage.id_subac_detail);
});

function getbudget(type1) {

    if (type1 == 'mandatory') {
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

    var sact_id = document.getElementById('expsact_id');
    var createdBy = document.getElementById('expcreatedBy');
    var expuser = document.getElementById('expuser');
    var expphoto = document.getElementById('expphoto');
    var expname = document.getElementById('expname');
    var expstatus = document.getElementById('expstatus');
    var exptitle = document.getElementById('exptitle');
    var type_currency = document.getElementById('type_currency');
    var expbudget = document.getElementById('expbudget');
    var expdate = document.getElementById('expdate');
    var expdescription = document.getElementById('activity_expenditure_description');
    var expdescription2 = document.getElementById('expdescription2');
    var expsubmit = document.getElementById('expsubmit');

    sact_id.value = "";
    createdBy.value = "";
    expphoto.setAttribute('src', '');
    expname.innerHTML = "";
    expstatus.innerHTML = "";
    exptitle.value = "";
    type_currency.value = "";
    expbudget.value = "";
    expdate.value = "";
    expdescription.innerHTML = "";

    $('#activity_expenditure_description').summernote('destroy');


    $.ajax({
        type: "GET",
        url: url_endpoint + "ajax_get_budget_expansive_id/" + localStorage.expenditure_idx,
        crossDomain: true,
        cache: false,
        success: function (data2) {

            if (data2.status == 'SUCCESS') {
                var fdata = data2.data;
                var status = '';
                if (fdata['status'] == '1') {
                    status = '<span class="badge badge-success bg-success text-white fs-10">Approved</span>';
                } else if (fdata['status'] == '2') {
                    status = '<span class="badge badge-danger bg-danger text-white fs-10">Rejected</span>';
                } else {
                    status = '<span class="badge badge-warning bg-warning text-dark fs-10">Pending</span>';
                }

                var cur = '';
                var bud = 0;
                if (fdata['type_currency'] == 'dollar') {

                    cur = fdata['budget_rupiah_text']
                    bud = fdata['budget'];
                } else {
                    cur = fdata['budget_dollar_text']
                    bud = fdata['budget_rupiah'];

                }

                document.getElementById('currentcydetailbudget').innerHTML = cur;

                expsubmit.style.display = 'none';
                expdescription.style.display = 'none';
                expdescription2.style.display = 'block';

                expuser.style.display = "flex";

                expphoto.setAttribute('src', base_url_endpoint + 'assets/images/avatars/' + fdata['photo']);
                expname.innerHTML = fdata['name'];
                expstatus.innerHTML = status;
                exptitle.value = fdata['title'];
                type_currency.value = fdata['type_currency'];
                expbudget.value = bud;
                expdate.value = fdata['date'];
                expdescription2.innerHTML = fdata['description'];

                exptitle.setAttribute('readonly', 'readonly');
                expbudget.setAttribute('readonly', 'readonly');
                expdate.setAttribute('readonly', 'readonly');
                expdescription2.setAttribute('readonly', 'readonly');
            }
        }

    });
}


function open_budget(t) {
    var id = t.getAttribute('data-id');
    if (t.value == "" || t.value == null || t.value == undefined) {
        document.getElementById(id).disabled = true;
    } else {
        document.getElementById(id).disabled = false;
    }
}



if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}
