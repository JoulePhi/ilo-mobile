$(document).ready(function () {
    var userid = localStorage.id;
    if (userid == null || userid == "undefined") {
        var base_url = base_urlx();
        window.location.href = "index.html";
    }
    

    $.ajax({
        type: "GET",
        url: url_endpoint + 'getNotif?user_id=' + localStorage.id,
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
            var notificationsList = document.getElementById('notifareay');
            var listItem = "";
            
            if (data.notif.length == 0) {
                listItem += "" +
                    '<div class="col-12 px-3" style="border-top:lightgrey 1px solid;border-bottom:lightgrey 1px solid; background: white; overflow:hidden">' +
                    '<a class="dropdown-item" href="javascript:void(0)" style="padding: 0.2rem 0.5rem; white-space: normal; word-wrap: break-word;" >' +
                    '<div class="row">' +
                    '<div class="flex-grow-1 row p-0 text-dark">' +
                    '<span class="text-normal text-center"><b>No Notification Yet</b></span>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>';
                notificationsList.innerHTML = listItem;
            } else {
                $.each(data.notif, function (index, notification) {
                    var pid = (notification.sub_activity_report_id > 0) ? notification.sub_activity_report_id : notification.sub_activity_id;
                    var type = (notification.sub_activity_report_id > 0) ? "act_report" : "act";
                    var d = new Date(notification.created_at);
                    var options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short'
                    };
                    var formattedDate = new Intl.DateTimeFormat('id-ID', options).format(d);
                 
                    var link = (notification.sub_activity_report_id > 0) ? 'activity_report_detail.html' : 'detail_activity.html';
                   
                    if(notification.initiative == 'true'){
                        link = 'initiative_report_detail.html';
                    }
                    if (notification.type == 'reject_act' || notification.type == 'cancel_approve_act' || notification.type == 'cancel_reject_act') {
                        link = '#';
                    }
                    if (index == 0) {
                        var border = "border-top:lightgrey 1px solid;border-bottom:lightgrey 1px solid;";
                    } else {
                        var border = "border-top:lightgrey 0px solid;border-bottom:lightgrey 1px solid;";
                    }
                    listItem += "" +
                        '<div class="col-12 px-3" style="' + border + ' ' + ((notification.is_readed == '0') ? 'background: #FFFBF1;' : 'background: aliceblue;') + 'overflow:hidden">' +
                        '<a class="dropdown-item" style="padding: 0.2rem 0.5rem; white-space: normal; word-wrap: break-word;" onclick="detailnotif(this)" data-href="' + link + '" data-id-notif="'+notification.notif_id+'" data-id="' + pid + '" data-type="' + type + '">' +
                        '<div class="row">' +
                        '<div class="ms-1 flex-grow-1 row p-0 text-dark">' +
                        '<span class="text-normal"><b>' + notification.message + '</b></span>' +
                        // '<small>' + notification.title + '</small>' +
                        '<small class="col-12 text-end " style="color:#0007">' + formattedDate + '</small>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>';
                });
                notificationsList.innerHTML = listItem;
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
});