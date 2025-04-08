$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
});
var datax = "";

var datamilestone = "";
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_data_sub_activities_detail?id_subac_detail=" + localStorage.id_subac_detail,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data.status == 'SUCCESS') {
                var list_activity = document.getElementById('list_activity');
                for (let i = 0; i < data.data['dactivity'].length; i++) {
                    var sub_activity_id = data.data['dactivity'][i]['sub_activity_id'];
                    var start = changeDateFormat(data.data['dactivity'][i]['start_date']);
                    var due = changeDateFormat(data.data['dactivity'][i]['due_date']);
                    var dateObj = new Date(start);
                    // Format the date to 'D MMMM YYYY'
                    var options = { day: 'numeric', month: 'long', year: 'numeric' };
                    var formattedDate = dateObj.toLocaleDateString('en-US', options);
                    // Update the start_date with the formatted date
                    data.data.dactivity[i]['start_date'] = formattedDate;
                    var milestone = '';

                  
                    for (let j = 0; j < data.data['milestone'][sub_activity_id].length; j++) {
                        var subindi_id = data.data['milestone'][sub_activity_id][j]['subindi_id'];
                        var percent = 0;
                        for (let k = 0; k < data.data['acreport'][sub_activity_id].length; k++) {
                            if (subindi_id == data.data['acreport'][sub_activity_id][k]['subac_id']) {
                                percent = ((data.data['acreport'][sub_activity_id][k]['total'] / data.data['milestone'][sub_activity_id][k]['measures']) * 100);
                                if (!Number.isInteger(percent)) {
                                    percent = percent.toFixed(2);
                                }
                            }
                        }
                        var width = percent + '%';
                        background = '#000e91';
                        if (percent == 0) {
                            width = 'fit-content';
                            background = '#fff';
                        }
                        milestone += '<p class="mb-0"><small>' + data.data['milestone'][sub_activity_id][j]['measures'] + ' ' + data.data['milestone'][sub_activity_id][j]['unit'] + '</small></p>';
                        // milestone += '<p class="mb-0"><small>' + data.data['milestone'][sub_activity_id][j]['measures'] + ' ' + data.data['milestone'][sub_activity_id][j]['unit'] + '</small></p>' +
                        //     '<div class="progress border border-ilo-dark-blue" role="progressbar" aria - label="Example with label" aria - valuenow="25" aria - valuemin="0" aria - valuemax="100" style = "border-radius: 5px;" > ' +
                        //     '<div class="progress-bar fs-10" style="width: ' + width + ';height: 20px;background-color:' + background + ';color:#ff0000;border-radius: 3px;text-align: center;font-weight: 900;"><small style="position: absolute;">' + percent + ' %</small>' +
                        //     '</div>' +
                        //     '</div>';
                    }
                    var listcity = '';
                    for (let l = 0; l < data.data['city'][sub_activity_id].length; l++) {
                        var type = "Kota"
                        if (data.data['city'][sub_activity_id][l]['type'] == 'Kabupaten') {
                            type = 'Kab. ';
                        }
                        listcity += '<li>' + type + ' ' + data.data['city'][sub_activity_id][l]['city'] + '</li>';
                    }
                    list_activity.innerHTML += '<div class="row mb-5">' +
                        '<div class="col-12" >' +
                        '<div class="card shadow-lg border border-ilo-dark-blue" style="box-shadow: 0px -5px #1E2DBE !important; border-radius: 0 !important;">' +
                        '<a href="javascript:void(0)" data-detail="' + sub_activity_id + '"  onclick="detailactivity(this)" ><h6 class="card-header text-ilo-dark-blue pb-0 ps-4 pe-4" style="border:none !important; border-radius: 0 !important;">' +
                        '<b><b>' + data.data['dactivity'][i]['sub_tit'] + '</b></b>' +
                        '</h6></a>' +
                        '<div class="card-body pt-0 ps-4 pe-4" style=" border-radius: 0 !important;">' +
                        '<div class="row">' +
                        '<div class="col-6 pe-1">' +
                        '<p class="card-text text-dark">' +
                        '<small>' +
                        '<b>Start Date : <span class="text-primary">' + start + '</span></b>' +
                        '</small>' +
                        '</p>' +
                        '</div>' +
                        '<div class="col-6 pe-1">' +
                        '<p class="card-text text-dark">' +
                        '<small>' +
                        '<b>Due Date : <span class="text-danger">' + due + '</span></b>' +
                        '</small>' +
                        '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row mt-3">' +
                        '<div class="col-12">' +
                        '<div class="row">' +

                        '<div class="col-12">' +
                        '<p class="mb-0"><b class="text-ilo-dark-blue">Milestone:</b></p>' +
                        milestone +
                        '<p class="mt-3 mb-0"><b class="text-ilo-dark-blue">Locations:</b></p>' +
                        '<div class="row">' +
                        '<div class="col-6">' +
                        '<ul class="mb-0 fs-10">' +
                        listcity +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-12">' +
                        '<button type="button" data-detail="' + sub_activity_id + '" onclick="detailactivity(this)" class="btn btn-ilo-dark-blue w-100 mt-5">View Detail</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div >' +
                        '</div >';
                }
            }
        }
    });
    
    

});




if (localStorage.wellcome == 'ok') {
    toastr.success("Selamat Datang " + localStorage.name);
    localStorage.wellcome = "done";
}

function detailactivity(t) {
    var id = t.getAttribute('data-detail');
    localStorage.id_detail_grievance = id;
    var base_url = base_urlx();
    window.location.href = "detail_activity.html";
}