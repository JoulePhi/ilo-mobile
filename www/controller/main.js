function base_urlx() {
  var url_now = window.location.href;
  var url_array = url_now.split("/");
  var base_url = url_array[0] + "//" + url_array[2] + "/" + url_array[3];
  return base_url;
}

Date.prototype.toDateInputValue = function () {
  let local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toISOString().split("T")[0];
};

function logout() {
  if (localStorage != null || localStorage != "" || localStorage != undefined) {
    var key = Object.keys(localStorage);
    for (var i = 0; i < key.length; i++) {
      localStorage.removeItem(key[i]);
    }
  }
  window.location.href = "index.html";
}

function opendropdown(t) {
  var status = t.getAttribute("data-status");
  let area = document.getElementsByClassName("dropdown-menu");
  let btn = document.getElementsByClassName("btndrop");
  var areax = document.getElementById("notifareax");
  if (status == "0") {
    t.dataset.status = "1";
    for (var ix = 0; ix < area.length; ix++) {
      if (btn[ix].dataset.status == "1") {
        area[ix].style.display = "block";
        area[ix].style.position = "absolute";
      }
      // console.log(btn[ix].dataset.status);
    }
  } else {
    area[0].style.display = "none";
    area[0].style.position = "absolute";
    btn[0].dataset.status = "0";
    area[1].style.display = "none";
    area[1].style.position = "absolute";
    btn[1].dataset.status = "0";
  }
}

var url_endpoint = "https://ilo-p2impact.id/api/";
var base_url_endpoint = "https://ilo-p2impact.id/";
$(document).ready(function () {
  var url_now = window.location.href;
  var url_array = url_now.split("/");
  var base_url = url_array[0] + "//" + url_array[2] + "/" + url_array[3];
  var url_now2 = window.location.href;
  var url_array2 = url_now2.split("/");
  if (
    url_array2[url_array2.length - 1] == "activities.html" ||
    url_array2[url_array2.length - 1] == "detail_activity.html" ||
    url_array2[url_array2.length - 1] == "activity_report_detail.html" ||
    url_array2[url_array2.length - 1] == "change_password.html"
  ) {
    var audio = document.getElementById("notificationSound");
    if (
      localStorage.id == null ||
      localStorage.id == "" ||
      localStorage.id == undefined
    ) {
      audio.muted = true;
    }
  }

  if ($("#countnumbnotif").length > 0) {
    load_unseen_notification();
    setInterval(function () {
      load_unseen_notification();
    }, 5000);
  }
});

function load_unseen_notification() {
  cachedAjax({
    method: "GET",
    url: url_endpoint + "ajaxGetUnreadNotifCount?user_id=" + localStorage.id,
    crossDomain: true,
    cache: false,
    success: function (data, isCache) {
      if (data.notifNum > 0) {
        var before = $(".countnumbnotif")[0].innerHTML;
        if (before !== data.notifNum) {
          $(".countnumbnotif").text(data.notifNum);
        }
      }
      // playSound();
    },
  });
}

function detailnotif(t) {
  var href = t.getAttribute("data-href");
  var id = t.getAttribute("data-id");
  var type = t.getAttribute("data-type");
  var notif_id = t.getAttribute("data-id-notif");
  if (type == "act") {
    localStorage.id_subac_detail = id;
  } else if (type == "act_report") {
    localStorage.id_subac_report = id;
  } else {
    logout();
    return false;
  }
  var base_url = base_urlx();
  cachedAjax({
    method: "GET",
    url: url_endpoint + "notifReaded?notif_id=" + notif_id,
    crossDomain: true,
    cache: false,
    success: function (data, isCache) {
      window.location.href = href;
    },
  });
}

function seepass(t) {
  var id = t.getAttribute("data-id");
  var icon = t.getAttribute("data-icon");
  let element = document.getElementById(id);
  let element_icon = document.getElementById(icon);
  if (element.type == "password") {
    element.type = "text";
    element_icon.classList.remove("uil-eye");
    element_icon.classList.add("uil-eye-slash");
  } else {
    element.type = "password";
    element_icon.classList.add("uil-eye");
    element_icon.classList.remove("uil-eye-slash");
  }
}

function arrayCombine(keys, values) {
  if (keys.length !== values.length) {
    throw new Error("Array lengths do not match");
  }
  var combined = {};
  for (var i = 0; i < keys.length; i++) {
    combined[keys[i]] = values[i];
  }
  return combined;
}

function changeDateFormat(dateString) {
  // Create a Date object from the string
  var dateObj = new Date(dateString);
  // Check for invalid date
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }
  // Format the date to 'D MMMM YYYY'
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  var formattedDate = dateObj.toLocaleDateString("id-ID", options);
  return formattedDate;
}

function changeDateFormat2(dateString) {
  // Create a Date object from the string
  var dateObj = new Date(dateString);
  // Check for invalid date
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }
  // Format the date to 'D MMMM YYYY'
  var options = { day: "numeric", month: "long", year: "numeric" };
  var formattedDate = dateObj.toLocaleDateString("id-ID", options);
  return formattedDate;
}

function changeDateFormat3(dateString) {
  // Create a Date object from the string
  var dateObj = new Date(dateString);
  // Check for invalid date
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }
  // Format the date to 'D MMMM YYYY'
  var options = { month: "long", year: "numeric" };
  var formattedDate = dateObj.toLocaleDateString("id-ID", options);
  return formattedDate;
}

function setLoadingButton(buttonSelector, isLoading, text) {
  var button = $(buttonSelector);
  if (isLoading) {
    button.prop("disabled", true);
    button.addClass("loading");
    button.html(text);
  } else {
    button.prop("disabled", false);
    button.removeClass("loading");
    button.html(text);
  }
}

function goBack() {
  history.back();
}
