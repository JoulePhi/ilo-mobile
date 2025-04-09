$(document).ready(function () {
  var userid = localStorage.id;
  if (userid == null || userid == "undefined") {
    var base_url = base_urlx();
    window.location.href = "index.html";
  }
  document
    .getElementById("ava")
    .setAttribute(
      "src",
      base_url_endpoint + "assets/images/avatars/" + localStorage.photo
    );
});
var datax = "";
var dataExpenditure = [];
var type1 = "mandatory";

$(document).ready(function () {
  var list_report = document.getElementById("list_report");
  const userId = localStorage.getItem("id");
  const subacId = localStorage.getItem("id_subac_detail");
  var localReports = localStorage.getItem(
    "offlineReports_" + subacId + "_" + userId
  );
  console.log(localReports);
  localReports = JSON.parse(localReports);
  const localReportsLength = 0;
  let localReportsCount = 0;
  if (localReports) {
    localReportsLength = localReports.length;
    localReports.reverse();
    for (let i = 0; i < localReports.length; i++) {
      let reports = JSON.parse(localReports[i]);

      console.log(typeof reports);
      let ofReport = reports["data"];
      let achivments = "";
      for (let j = 0; j < ofReport["achievment[]"].length; j++) {
        achivments += ofReport["achievment[]"][j] + " SMEs<br>";
      }
      list_report.innerHTML +=
        `<tr id="or-${localReports[i]["id"]}">` +
        '<td><p class="mb-0" style="text-transform: capitalize">' +
        ofReport["title"] +
        `</p>
          <small class="text-danger">This report is offline</small>
          </td>` +
        "<td>" +
        achivments +
        "</td>" +
        `<td class="text-center">
            <a href="#" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0 disabled">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
                <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5.5 0 0 0 14.367 7zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />
              </svg>
              </a>
            </td>` +
        "</tr>";
      if (navigator.onLine) {
        // const formData = new FormData();
        // for (const key in ofReport) {
        //   if (ofReport.hasOwnProperty(key)) {
        //     formData.append(key, ofReport[key]);
        //   }
        // }
        // $.ajax({
        //   type: "POST",
        //   url: reports["url"],
        //   data: formData,
        //   dataType: "json",
        //   contentType: false,
        //   processData: false,
        //   success: function (data) {
        //     if (data.status == "success") {
        //       localReports.splice(i, 1);
        //       localStorage.setItem(
        //         "offlineReports_" + subacId + "_" + userId,
        //         JSON.stringify(localReports)
        //       );
        //       localReportsCount++;
        //       if (localReportsCount == localReportsLength) {
        //         console.log("All reports have been sent");
        //         toastr.success("All reports have been sent");
        //         setTimeout(function () {
        //           location.reload();
        //         }, 2000);
        //       }
        //     } else {
        //       console.log("Failed to send report");
        //     }
        //   },
        // });
      }
    }
  }
  cachedAjax({
    url:
      url_endpoint +
      "get_data_sub_activities_detail?id_subac_detail=" +
      localStorage.id_subac_detail,
    cacheKey: "get_data_sub_activities_detail",
    success: function (data, isCached) {
      datax = data;
      if (data.status == "SUCCESS") {
        $("#sact_id").val(localStorage.id_subac_detail);
        $("#createdBy").val(localStorage.id);
        if (data.data["milestone"][localStorage.id_subac_detail].length < 2) {
          // var text_mm = $('#milestone_id option:selected').text();
          $("#add-milestone-button").css("display", "none");
          $("#btn-del-milestone").css("display", "none");
          $("#milestone_id").css("display", "none");
          html_m = "";
          html_m +=
            '<tr id="milestone_' +
            data.data["milestone"][localStorage.id_subac_detail][0][
              "subindi_id"
            ] +
            '">';
          html_m += '<td colspan="2">';
          html_m += '<div class="row d-flex justify-content-between">';

          html_m += '<div class="col-12">';
          html_m += "<label>Achievement</label>";
          html_m +=
            '<input type="number" min="0" class="form-control achievement_add_report" value="0" name="achievment[]">';
          html_m += "</div>";
          html_m +=
            '<div class="col-12 my-auto"> on ' +
            data.data["milestone"][localStorage.id_subac_detail][0][
              "measures"
            ] +
            " " +
            data.data["milestone"][localStorage.id_subac_detail][0]["unit"] +
            " By " +
            changeDateFormat3(
              data.data["milestone"][localStorage.id_subac_detail][0][
                "timeline"
              ]
            );
          // html_m += '<select class="form-select form-select milestone_dropdown" id="activity_report_milestone_' + 1 + '" name="milestone[]"></select>';
          html_m +=
            '<input type="hidden" id="activity_report_milestone_' +
            data.data["milestone"][localStorage.id_subac_detail][0][
              "subindi_id"
            ] +
            '" name="milestone[]" value="' +
            data.data["milestone"][localStorage.id_subac_detail][0][
              "subindi_id"
            ] +
            '">';
          html_m += "</div>";
          html_m += "</div>";
          html_m += "</td>";
          html_m += "</tr>";
          $("#milestone_field").html(html_m);
        } else {
          $("#btn-add-milestone").html(
            '<button type="button" id="add-milestone-button" class="btn btn-primary btn-sm px-1" data-num="0" onclick="add_milestone(' +
              data.data["milestone"][localStorage.id_subac_detail].length +
              ')">Add Achievement</button>'
          );
        }
        document.getElementById("date").valueAsDate = new Date();
        var list_activity = document.getElementById("list_activity");

        var list_gallery = document.getElementById("list_gallery");
        var allcomment = document.getElementById("allcomment");
        for (let i = 0; i < data.data["dactivity"].length; i++) {
          var sub_activity_id = data.data["dactivity"][i]["sub_activity_id"];
          var start = changeDateFormat2(
            data.data["dactivity"][i]["start_date"]
          );
          var due = changeDateFormat2(data.data["dactivity"][i]["due_date"]);
          var dateObj = new Date(start);
          // Format the date to 'D MMMM YYYY'
          var options = { day: "numeric", month: "long", year: "numeric" };
          var formattedDate = dateObj.toLocaleDateString("en-US", options);
          // Update the start_date with the formatted date
          data.data.dactivity[i]["start_date"] = formattedDate;
          var milestone = "";
          // console.log(data);
          for (
            let j = 0;
            j < data.data["milestone"][sub_activity_id].length;
            j++
          ) {
            var subindi_id =
              data.data["milestone"][sub_activity_id][j]["subindi_id"];
            var percent = 0;
            for (
              let k = 0;
              k < data.data["acreport"][sub_activity_id].length;
              k++
            ) {
              if (
                subindi_id ==
                data.data["acreport"][sub_activity_id][k]["subac_id"]
              ) {
                percent =
                  (data.data["acreport"][sub_activity_id][k]["total"] /
                    data.data["milestone"][sub_activity_id][k]["measures"]) *
                  100;
                if (!Number.isInteger(percent)) {
                  percent = percent.toFixed(2);
                }
              }
            }
            var width = percent + "%";
            background = "#1B72F9";
            if (percent == 0) {
              width = "fit-content";
              background = "#fff0";
            }
            milestone +=
              '<p class="mb-0 text-ilo-dark-blue fs-14 "><span>' +
              data.data["milestone"][sub_activity_id][j]["measures"] +
              " " +
              data.data["milestone"][sub_activity_id][j]["unit"] +
              " by " +
              changeDateFormat3(
                data.data["milestone"][localStorage.id_subac_detail][j][
                  "timeline"
                ]
              ) +
              "</span></p>";
          }
          var listcity = "";
          for (let l = 0; l < data.data["city"][sub_activity_id].length; l++) {
            var type = "Kota";
            if (data.data["city"][sub_activity_id][l]["type"] == "Kabupaten") {
              type = "Kab. ";
            }
            listcity +=
              '<li class="fw-bold fs-12">' +
              type +
              " " +
              data.data["city"][sub_activity_id][l]["city"] +
              "</li>";
          }

          var male = 0;
          var female = 0;

          for (let m = 0; m < data.data["report"].length; m++) {
            male += parseInt(data.data["report"][m]["male"]);
            female += parseInt(data.data["report"][m]["female"]);
          }

          totalg = male + female;

          document.getElementById("totmale").innerHTML = male;
          document.getElementById("totfemale").innerHTML = female;
          document.getElementById("totalg").innerHTML = totalg;

          var status = "";

          if (data.data["dactivity"][i]["status"] == "1") {
            status =
              '<span class="badge badge-danger bg-danger">On Hold</span>';
          } else if (data.data["dactivity"][i]["status"] == "2") {
            status =
              '<span class="badge badge-primary bg-primary">On Going</span>';
          } else if (data.data["dactivity"][i]["status"] == "3") {
            status =
              '<span class="badge badge-success bg-success">Finished</span>';
          }

          type1 = data.data["dactivity"][i]["type"];

          getbudget(type1);
          var type =
            '<span class="badge border border-dark bg-bg-white text-dark">Mandatory</span>';
          if (data.data["dactivity"][i]["type"] == "initiative") {
            type =
              '<span class="badge border border-dark bg-bg-white text-dark">Initiative By Partners</span>';
          }

          list_activity.innerHTML +=
            '<div class="col-12 p-0" >' +
            '<div class="card shadow-xl border " style=" border-radius: 0 !important;">' +
            '<div class="card-header  pb-0 ps-5 pe-5" style="border:none !important;">' +
            '<h6 class=" text-dark"  >' +
            "<b><b   >" +
            data.data["dactivity"][i]["sub_tit"] +
            "</b></b>" +
            "</h6>" +
            '<div class="col-12 mb-1">' +
            status +
            " " +
            type +
            "</div>" +
            '<hr class="m-0 mt-2 mb-2">' +
            "</div>" +
            '<div class="card-body pt-0 ps-5 pe-5">' +
            '<div class="row">' +
            '<div class="col-12 pe-1">' +
            '<p class="mb-0"><b class="text-ilo-dark-blue">Description:</b></p>' +
            '<p class="fs-14 text-dark mb-2">' +
            data.data["dactivity"][i]["sub_desc"] +
            "</p>" +
            "</div>" +
            "</div>" +
            '<div class="row mt-1">' +
            '<div class="col-6 pe-1" style="border-right: 1px solid #d2d0d0;">' +
            '<p class="card-text text-dark">' +
            "<small>" +
            '<b class="row"><span >Start Date: </span><span class="text-primary">' +
            start +
            "</span></b>" +
            "</small>" +
            "</p>" +
            "</div>" +
            '<div class="col-6 pe-1">' +
            '<p class="card-text text-dark">' +
            "<small>" +
            '<b class="row"><span >Due Date: </span><span class="text-danger">' +
            due +
            "</span></b>" +
            "</small>" +
            "</p>" +
            "</div>" +
            "</div>" +
            '<div class="row mt-3">' +
            '<div class="col-12">' +
            '<div class="row">' +
            '<div class="col-12">' +
            '<p class="mb-0"><b class="text-ilo-dark-blue">Milestone:</b></p>' +
            milestone +
            '<p class="mt-3 mb-0"><b class="text-ilo-dark-blue">Locations:</b></p>' +
            '<div class="d-flex">' +
            '<div class="col-1">' +
            '<i class="uil uil-map-pin-alt col-2 p-1 text-ilo-dark-blue"></i>' +
            "</div >" +
            '<div class="col-10">' +
            '<ul class="mb-0 fs-10 ps-4">' +
            listcity +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div >";
        }
        for (let m = 0; m < data.data["report"].length; m++) {
          var achievment = "";
          // console.log(data.data['report']);
          for (let p = 0; p < data.data["report"].length; p++) {
            if (
              data.data["report"][m]["sub_activity_report_id"] ==
              data.data["report"][p]["sub_activity_report_id"]
            ) {
              achievment +=
                data.data["report"][p]["achievment"] +
                " " +
                data.data["report"][p]["unit"];
              if (data.data["report"].length > 1) {
                achievment += "<br/>";
              }
            }
          }
          if (m > 0) {
            if (
              data.data["report"][m]["sub_activity_report_id"] !=
              data.data["report"][m - 1]["sub_activity_report_id"]
            ) {
              list_report.innerHTML +=
                '<tr onclick="report_detail(this)" data-report="' +
                data.data["report"][m]["sub_activity_report_id"] +
                '">' +
                '<td><p class="mb-0" style="text-transform: capitalize" >' +
                data.data["report"][m]["title"] +
                "</p></td>" +
                "<td>" +
                data.data["report_milestone"][data.data["report"][m]["sarid"]] +
                "</td>" +
                '<td class="text-center">' +
                '<a onclick="report_detail(this)" data-report="' +
                data.data["report"][m]["sub_activity_report_id"] +
                '" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0" > ' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill = "currentColor" class="bi bi-folder2-open" viewBox = "0 0 16 16" > ' +
                '<path d = "M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />' +
                "</svg>" +
                "</a>" +
                "</td>" +
                "</tr>";
            }
          } else {
            list_report.innerHTML += `
              <tr onclick="report_detail(this)" data-report="${
                data.data["report"][m]["sub_activity_report_id"]
              }">
              <td><p class="mb-0" style="text-transform: capitalize">${
                data.data["report"][m]["title"]
              }</p></td>
              <td>${
                data.data["report_milestone"][data.data["report"][m]["sarid"]]
              }</td>
              <td class="text-center">
                <a onclick="report_detail(this)" data-report="${
                  data.data["report"][m]["sub_activity_report_id"]
                }" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
                  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5.5 0 0 0 14.367 7zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />
                </svg>
                </a>
              </td>
              </tr>`;
          }
        }
        for (let n = 0; n < data.data["gallery"].length; n++) {
          list_gallery.innerHTML +=
            '<div class="col-6 mb-2">' +
            '<img style="width:150px !important;height:150px !important;object-fit:cover;" class="rounded" onclick="opgallery(`' +
            base_url_endpoint +
            "assets/uploads/activity_report_attachment/" +
            data.data["gallery"][n]["attachment"] +
            '`)" src="' +
            base_url_endpoint +
            "assets/uploads/activity_report_attachment/" +
            data.data["gallery"][n]["attachment"] +
            '" alt = "" > ' +
            "</div>";
        }
        var localComments = localStorage.getItem(
          "offlineComment_" + subacId + "_" + userId
        );
        localComments = JSON.parse(localComments);
        if (localComments) {
          localComments.reverse();
          for (let i = 0; i < localComments.length; i++) {
            let comment = JSON.parse(localComments[i]);
            let commData = comment["data"];
            var a_c_html = "";
            a_c_html += `
        <div class="row mt-3 justify-content-center">
          <div class="col-11 mb-2 px-0">
        <div class="card border shadow shadow-lg">
          <div class="card-header px-5 py-3">
        <div class="row">
          <div class="col-2 d-flex justify-content-center">
        <img style="border-radius: 50%;" src="${base_url_endpoint}assets/images/avatars/${
              localStorage.photo
            }" alt="" width="40" height="40">
          </div>
          <div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">
        <b class="mb-0 fs-12 text-dark col-12"> You </b>
        <span class="mb-0 fs-10 col-12" style="color: grey;"> ${changeDateFormat(
          comment.timestamp
        )} </span>
        <span class="badge bg-warning text-dark fs-10">Offline</span>
          </div>
        </div>
          </div>
          <div class="card-body pe-5 ps-5 pt-1 pb-2">
        <div class="fs-12 mb-0">${commData["comment"]}</div>
          </div>
        </div>
          </div>
        </div>`;
            $("#allcomment").prepend(a_c_html);
          }
        }
        for (let o = 0; o < data.data["comment"].length; o++) {
          var name = data.data["comment"][o]["name"];
          if (data.data["comment"][o]["created_by"] == localStorage.id) {
            name = "You";
          }
          var t_comment = "";
          var title = "";
          if (
            data.data["comment"][o]["sub_activity_report_id"] !== 0 &&
            data.data["comment"][o]["sub_activity_report_id"] !== "0"
          ) {
            title = data.data["comment"][o]["title"];
            t_comment =
              '<a class="fs-10 text-dark" href="#">Commented on ' +
              title +
              "</a>";
          }
          allcomment.innerHTML +=
            '<div class="row mt-3 justify-content-center">' +
            '<div class="col-11 mb-2 px-0">' +
            '<div class="card border shadow shadow-lg">' +
            '<div class="card-header px-5 py-3">' +
            '<div class="row">' +
            '<div class="col-2 d-flex justify-content-center my-auto">' +
            '<img style="border-radius: 50%;" src="' +
            base_url_endpoint +
            "assets/images/avatars/" +
            data.data["comment"][o]["photo"] +
            '" alt="" width="40" height="40">' +
            "</div>" +
            '<div class="col-9 p-0 d-flex flex-wrap" style="align-self: center;">' +
            t_comment +
            '<b class="my-0 fs-12 text-dark col-12" > ' +
            name +
            "</b>" +
            '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' +
            changeDateFormat(data.data["comment"][o]["created_at"]) +
            "</span > " +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
            '<div class="fs-12 mb-0">' +
            data.data["comment"][o]["comment"] +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        }
      }
    },
  });

  if ($("#comment").length) {
    // $('#comment').summernote({
    //     toolbar: [
    //     ['font', ['bold', 'underline', 'clear']],
    //     ['para', ['ul', 'ol']],
    //     ]
    // });
    tinymce.init({
      selector: "#comment",
    });
  }

  if ($("#description").length) {
    // $('#description').summernote({
    //     toolbar: [
    //     ['font', ['bold', 'underline', 'clear']],
    //     ['para', ['ul', 'ol']],
    //     ]
    // });
    tinymce.init({
      selector: "#description",
    });
  }
  $("#add_report_form").on("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(document.querySelector("form#add_report_form"));
    cachedAjax({
      cacheKey: url_endpoint + "ajaxAddReport",
      method: "POST",
      url: url_endpoint + "ajaxAddReport",
      data: formData,
      // data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (data, isCache) {
        if (data.status == "success") {
          location.reload();
        } else {
          Swal.fire({
            title: "Add Report Failed",
            text: "Failed to add report, please try again later",
            icon: "error",
          });
        }
      },
    });
  });

  // $("#form_comment").on("submit", function(event) {
  //     event.preventDefault();
  //     let timeout = null;//loading
  //     var button = $('#bsubmit');
  //     setLoadingButton($(button), true, '<span class="eos-icons--bubble-loading"></span>');
  //     var fd = new FormData($('#form_comment')[0]);
  //     fd.append('sub_activity_id', localStorage.id_subac_detail);
  //     fd.append('sub_activity_report_id', 0);
  //     fd.append('created_by', localStorage.id);
  //     fd.append(datay['name'], datay['token']);
  //     $.ajax({
  //         url: url_endpoint + 'send_comment',
  //         type: "POST",
  //         crossDomain: true,
  //         cache: false,
  //         contentType: false,
  //         processData: false,
  //         data: fd,
  //         success: function (data) {
  //             clearTimeout(timeout);
  //             setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
  //             if (data['status'] == "SUCCESS") {
  //                 toastr.success(data['message']);
  //                 var allcomment = document.getElementById('allcomment');
  //                 allcomment.innerHTML += '<div class="row mt-3 justify-content-center">' +
  //                     '<div class="col-11 mb-2 px-0">' +
  //                     '<div class="card border shadow shadow-lg">' +
  //                     '<div class="card-header px-5 py-3">' +
  //                     '<div class="row">' +
  //                     '<div class="col-2 d-flex justify-content-center">' +
  //                     '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + localStorage.photo + '" alt="" width="40" height="40">' +
  //                     '</div>' +
  //                     '<div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">' +
  //                     '<b class="mb-0 fs-12 text-dark col-12"> You </b>' +
  //                     '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' + changeDateFormat(new Date) +
  //                     '</span > ' +
  //                     '</div>' +
  //                     '</div>' +
  //                     '</div>' +
  //                     '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
  //                     '<div class="fs-12 mb-0">' +
  //                     comment +
  //                     '</div>' +
  //                     '</div>' +
  //                     '</div>' +
  //                     '</div>' +
  //                     '</div>';
  //                 $('#comment').val('');
  //             } else {
  //                 toastr.error(data['message']);
  //             }
  //         },
  //         error: function (xhr, status, error) {
  //             console.log(error);
  //             // clearTimeout(timeout);
  //             // toastr.error(error);
  //             // clearTimeout(timeout);
  //             // setLoadingButton($(button), false, '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>');
  //         }
  //     });
  // });

  // $('.milestone_dropdown').select2({
  //     dropdownParent: $('#addActivityReportModal'),
  //     minimumResultsForSearch: -1,
  // });

  getlocation();
  init_milestone_dropdown(0);
});

function getbudget(type1) {
  if (type1 == "mandatory") {
    var list_expenditure = document.getElementById("list_expenditure");
    const userId = localStorage.getItem("id");
    const subacId = localStorage.getItem("id_subac_detail");
    var offlineExpenditureBudget = localStorage.getItem(
      "offlineExpenditureBudget_" + subacId + "_" + userId
    );
    console.log(offlineExpenditureBudget);
    offlineExpenditureBudget = JSON.parse(offlineExpenditureBudget);

    if (offlineExpenditureBudget != null) {
      offlineExpenditureBudget.reverse();
      for (let i = 0; i < offlineExpenditureBudget.length; i++) {
        let exp = JSON.parse(offlineExpenditureBudget[i]);
        let expData = exp["data"];
        list_expenditure.innerHTML +=
          "<tr >" +
          '<td><p class="mb-0" style="text-transform: capitalize">' +
          expData["exptitle"] +
          "</p></td>" +
          "<td>" +
          `<span class="badge badge-warning bg-warning text-dark fs-10">Offline</span>` +
          "</td>" +
          '<td class="text-center">' +
          '<a class="btn btn-ilo-green btn-sm disabled p-1 pt-0 pb-0" > ' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill = "currentColor" class="bi bi-folder2-open" viewBox = "0 0 16 16" > ' +
          '<path d = "M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />' +
          "</svg>" +
          "</a>" +
          "</td>" +
          "<td>" +
          "-" +
          "</td>" +
          "</tr>";
      }
    }

    document.getElementById("acEndBudget").style.display = "flex";
    cachedAjax({
      method: "GET",
      cacheKey: "ajax_get_budget_expansive",
      url:
        url_endpoint +
        "ajax_get_budget_expansive/" +
        localStorage.id_subac_detail,
      success: function (data2, isCache) {
        if (data2.status == "SUCCESS") {
          dataExpenditure = data2["data"];
          for (let e = 0; e < data2["data"].length; e++) {
            var st = data2["data"][e]["status"];

            var stat = "";
            if (st == "1") {
              stat =
                '<span class="badge badge-success bg-success text-white fs-10">Approved</span>';
            } else if (st == "2") {
              stat =
                '<span class="badge badge-danger bg-danger text-white fs-10">Rejected</span>';
            } else {
              stat =
                '<span class="badge badge-warning bg-warning text-dark fs-10">Pending</span>';
            }
            var btn_revision = "";
            // console.log(data2['data'][e]['status']);
            if (data2["data"][e]["status"] == "2") {
              // btn_revision = '<button onclick="insertRevisionFormExpenditure(this)" data-id="'+data2['data'][e]['id']+'" class="btn btn-small btn-warning btn-sm mx-1 p-1">Revision</button>';
              btn_revision =
                '<a href="expenditure_budget_revision.html" data-id="' +
                data2["data"][e]["id"] +
                '" class="btn btn-small btn-warning btn-sm mx-1 p-1">Revision</a>';
            } else {
              btn_revision = "-";
            }

            list_expenditure.innerHTML +=
              "<tr >" +
              '<td  onclick="showExpenditure(' +
              data2["data"][e]["id"] +
              ')"><p class="mb-0" style="text-transform: capitalize">' +
              data2["data"][e]["title"] +
              "</p></td>" +
              '<td  onclick="showExpenditure(' +
              data2["data"][e]["id"] +
              ')">' +
              stat +
              "</td>" +
              '<td class="text-center"  onclick="showExpenditure(' +
              data2["data"][e]["id"] +
              ')">' +
              '<a onclick="showExpenditure(' +
              data2["data"][e]["id"] +
              ')" data-exp="' +
              data2["data"][e]["id"] +
              '" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0" > ' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill = "currentColor" class="bi bi-folder2-open" viewBox = "0 0 16 16" > ' +
              '<path d = "M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />' +
              "</svg>" +
              "</a>" +
              "</td>" +
              "<td>" +
              btn_revision +
              "</td>" +
              "</tr>";
          }
        }
      },
    });
  }
}
function open_budget(t) {
  var id = t.getAttribute("data-id");
  if (t.value == "" || t.value == null || t.value == undefined) {
    document.getElementById(id).disabled = true;
  } else {
    document.getElementById(id).disabled = false;
  }
}
function insertRevisionFormExpenditure(t) {
  var modalElement = document.getElementById("revisionActivityBudgetExpansive");
  var myModal = new bootstrap.Modal(modalElement);
  myModal.show();
  var id = t.getAttribute("data-id");
  var note = document.getElementById("note_area");
  cachedAjax({
    cacheKey: url_endpoint + "ajax_get_expenditure_edit",
    url: url_endpoint + "ajax_get_expenditure_edit",
    method: "GET",
    data: { id: id },
    crossDomain: true,
    cache: false,
    dataType: "json",
    success: function (data, isCache) {
      // var data = JSON.parse(datax);
      if (data.status == "success") {
        note.innerHTML = data.data["note"];
        document.getElementById("activity_expenditure_id_revision").value =
          data.data["id"];
        document.getElementById("activity_expenditure_sact_id_revision").value =
          data.data["sub_activity_id"];
        document.getElementById("activity_expenditure_title_revision").value =
          data.data["title"];
        if (data.data["type_currency"] == "rupiah") {
          document.getElementById(
            "activity_expenditure_budget_revision"
          ).value = data.data["budget_rupiah"];
        } else {
          document.getElementById(
            "activity_expenditure_budget_revision"
          ).value = data.data["budget"];
        }
        $("#type_currency_revision").val(data.data["type_currency"]).change();
        document.getElementById(
          "activity_expenditure_description_revision"
        ).innerHTML = data.data["description"];
        $("#activity_expenditure_description_revision").summernote({
          toolbar: [
            ["font", ["bold", "underline", "clear"]],
            ["para", ["ul", "ol"]],
          ],
        });
        $("#activity_expenditure_description_revision").summernote(
          "code",
          data.data["description"]
        );
        document.getElementById("activity_expenditure_date_revision").value =
          data.data["date"];
      }
    },
  });
}

function showExpenditure(id) {
  // $('#ActivityExpenditureModal').modal('show');

  var sact_id = document.getElementById("expsact_id");
  var createdBy = document.getElementById("expcreatedBy");
  var expuser = document.getElementById("expuser");
  var expphoto = document.getElementById("expphoto");
  var expname = document.getElementById("expname");
  var expstatus = document.getElementById("expstatus");
  var exptitle = document.getElementById("exptitle");
  var expbudget = document.getElementById("expbudget");
  var expdate = document.getElementById("expdate");
  var expdescription = document.getElementById(
    "activity_expenditure_description"
  );
  var expdescription2 = document.getElementById("expdescription2");
  var expsubmit = document.getElementById("expsubmit");

  sact_id.value = "";
  createdBy.value = "";
  expphoto.setAttribute("src", "");
  expname.innerHTML = "";
  expstatus.innerHTML = "";
  exptitle.value = "";
  expbudget.value = "";
  expdate.value = "";
  expdescription.innerHTML = "";

  if (id != "") {
    localStorage.expenditure_idx = id;
    window.location.href = "expenditure_budget_detail.html";
    // $('#activity_expenditure_description').summernote('destroy');

    //  var fdata = [];

    // for (var i = 0, len = dataExpenditure.length; i < len; i++) {
    //     if (parseInt(dataExpenditure[i]['id']) ===  id) {
    //         fdata = dataExpenditure[i];
    //         break;
    //     }
    // }

    // var status = '';
    // if(fdata['status'] == '1'){
    //     status = '<span class="badge badge-success bg-success text-white fs-10">Approved</span>';
    // }else if(fdata['status'] == '2'){
    //     status = '<span class="badge badge-danger bg-danger text-white fs-10">Rejected</span>';
    // }else {
    //     status = '<span class="badge badge-warning bg-warning text-dark fs-10">Pending</span>';
    // }

    // expsubmit.style.display = 'none';
    // expdescription.style.display = 'none';
    // expdescription2.style.display = 'block';

    // expuser.style.display ="flex";

    // expphoto.setAttribute('src', base_url_endpoint+'assets/images/avatars/'+fdata['photo']);
    // expname.innerHTML = fdata['name'];
    // expstatus.innerHTML = status;
    // exptitle.value = fdata['title'];
    // expbudget.value = fdata['budget'];
    // expdate.value = fdata['date'];
    // expdescription2.innerHTML = fdata['description'];

    // exptitle.setAttribute('readonly','readonly');
    // expbudget.setAttribute('readonly','readonly');
    // expdate.setAttribute('readonly','readonly');
    // expdescription2.setAttribute('readonly','readonly');
  } else {
    $("#activity_expenditure_description").summernote({
      toolbar: [
        ["font", ["bold", "underline", "clear"]],
        ["para", ["ul", "ol"]],
      ],
    });
    sact_id.value = localStorage.id_subac_detail;
    createdBy.value = localStorage.id;

    expsubmit.style.display = "block";
    expuser.style.display = "none";

    // expdescription.style.display = 'block';
    expdescription2.style.display = "none";

    exptitle.removeAttribute("readonly");
    expbudget.removeAttribute("readonly");
    expdate.removeAttribute("readonly");
  }
}

function submitexp() {
  var expformData = new FormData(
    document.querySelector("form#add_expenditure_form")
  );

  var exptitle = document.getElementById("exptitle").value;
  var type_currency = document.getElementById("type_currency").value;
  var expbudget = document.getElementById("expbudget").value;
  var expdate = document.getElementById("expdate").value;
  var expdescription = document.getElementById(
    "activity_expenditure_description"
  ).value;
  console.log(type_currency);
  if (
    exptitle == "" ||
    type_currency == "" ||
    expbudget == "" ||
    expdate == "" ||
    expdescription == ""
  ) {
    Swal.fire({
      title: "Oops",
      text: "All fields must be filled",
      icon: "error",
    });
    return false;
  } else {
    cachedAjax({
      method: "POST",
      url: url_endpoint + "ajax_add_expenditure",
      data: expformData,
      cacheKey: url_endpoint + "ajax_add_expenditure",
      // data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (data, isCache) {
        if (data.status == "SUCCESS") {
          location.reload();
        } else {
          Swal.fire({
            title: "Oops",
            text: "Failed to add Activity Expenditure Budget, please try again later",
            icon: "error",
          });
        }
      },
    });
  }
}
function submitexprevision() {
  var expformData = new FormData(
    document.querySelector("form#revision_report_form")
  );

  var exptitle = document.getElementById(
    "activity_expenditure_title_revision"
  ).value;
  var expbudget = document.getElementById(
    "activity_expenditure_budget_revision"
  ).value;
  var type_currency = document.getElementById("type_currency_revision").value;
  var expdate = document.getElementById(
    "activity_expenditure_date_revision"
  ).value;
  var expdescription = document.getElementById(
    "activity_expenditure_description_revision"
  ).value;
  // console.log(exptitle);
  // console.log(type_currency);
  // console.log(expbudget);
  // console.log(expdate);
  // console.log(expdescription);
  if (
    exptitle == "" ||
    type_currency == "" ||
    expbudget == "" ||
    expdate == "" ||
    expdescription == ""
  ) {
    Swal.fire({
      title: "Oops",
      text: "All fields must be filled",
      icon: "error",
    });
    return false;
  } else {
    cachedAjax({
      method: "POST",
      cacheKey: url_endpoint + "ajax_revision_expenditure",
      url: url_endpoint + "ajax_revision_expenditure",
      data: expformData,
      // data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (data, isCache) {
        if (data.status == "SUCCESS") {
          location.reload();
        } else {
          Swal.fire({
            title: "Oops",
            text: "Failed to add Activity Expenditure Budget, please try again later",
            icon: "error",
          });
        }
      },
    });
  }
}

function getlocation() {
  cachedAjax({
    url: url_endpoint + "ajaxGetLocationBySact",
    cacheKey: "ajaxGetLocationBySact",
    method: "GET",
    data: { sact: localStorage.id_subac_detail },
    dataType: "json",
    success: function (data, isCache) {
      $("#location").html("");
      $.each(data, function (index, value) {
        var html =
          '<option value="' + value.id + '">' + value.text + "</option>";
        $("#location").append(html);
      });
    },
  });

  $("#location").select2({
    dropdownParent: $("#add_report_form>.modal-body>.row"),
  });
}

function init_milestone_dropdown(id_m) {
  cachedAjax({
    cacheKey: url_endpoint + "ajaxGetMilestoneBySact",
    url: url_endpoint + "ajaxGetMilestoneBySact",
    method: "GET",
    data: { sact: localStorage.id_subac_detail },
    dataType: "json",
    success: function (data, isCache) {
      $("#milestone_id").html("");
      $.each(data, function (index, value) {
        if (value.id != id_m) {
          var html =
            '<option value="' + value.id + '">' + value.text + "</option>";
          $("#milestone_id").append(html);
        }
      });
    },
  });

  $("#milestone_id").select2({
    dropdownParent: $("#add_report_form>.modal-body>.row"),
    escapeMarkup: function (markup) {
      return markup;
    },
  });
}

function add_milestone(params) {
  var rows = document.getElementById("milestone_field").rows;
  // var id_m = (parseInt(rows[rows.length - 1].id.split("_")[1]) + 1);
  var id_mm = $("#milestone_id option:selected").val();
  var text_mm = $("#milestone_id option:selected").text();
  if (!$("#milestone_" + id_mm).length) {
    var num = parseInt(
      document.getElementById("add-milestone-button").getAttribute("data-num")
    );
    document
      .getElementById("add-milestone-button")
      .setAttribute("data-num", num + 1);
    var datnum = num + 1;

    const selectElement = document.querySelector("#milestone_id");
    const selectedValue = selectElement.value;
    const options = Array.from(selectElement.options);

    // Find the currently selected option
    const currentIndex = options.findIndex(
      (option) => option.value === selectedValue
    );

    if (currentIndex !== -1) {
      // Disable the currently selected option
      selectElement.options[currentIndex].style.display = "none";

      // Find the next option
      const nextIndex = currentIndex + 1;

      if (nextIndex < options.length) {
        // Deselect the currently selected option
        selectElement.selectedIndex = nextIndex;

        // Optionally, set the next option as selected
        options[nextIndex].setAttribute("selected", "selected");
      } else {
        console.log("No more options available");
      }
    }

    var html = "";
    html += '<tr id="milestone_' + id_mm + '">';
    html += '<td colspan="2">';
    html += '<div class=" d-flex flex-wrap justify-content-between">';
    // html += '<div class="col-5">';
    // html += '<input type="number" min="0" class="form-control achievement_add_report" value="0" name="achievment[]">';
    // html += '</div>';
    // html += '<div class="col-7"> on '+text_mm;
    // // html += '<select class="form-select form-select milestone_dropdown" id="activity_report_milestone_' + id_mm + '" name="milestone[]"></select>';
    // html += '<input type="hidden" id="activity_report_milestone_' + id_mm + '" name="milestone[]" value="'+id_mm+'">';
    // html += '</div>';

    html +=
      '<label class="form-label fw-bold text-dark">Achievement ' +
      datnum +
      '<label class="text-danger">*</label></label>';
    html += '<div class="col-9">';
    html +=
      '<input type="number" min="0" class="form-control achievement_add_report" value="0" name="achievment[]" required>';
    html += "</div>";
    html += '<div class="col-3">';
    html +=
      '<button type="button" class="btn btn-danger w-100 h-100 p-1 " onclick="del_milestone_field(' +
      id_mm +
      ')"><i class="fs-20 uil uil-trash"></i></button>';
    html += "</div>";
    html += '<div class="col-12 my-auto">';
    // html += '<select class="form-select form-select milestone_dropdown" id="activity_report_milestone_' + 1 + '" name="milestone[]"></select>';
    html +=
      '<input type="hidden" required id="activity_report_milestone_' +
      id_mm +
      '" name="milestone[]" value="' +
      id_mm +
      '">';
    html += "</div>on " + text_mm;
    html += "</div>";
    html += "</td>";
    html += "</tr>";
    $("#milestone_field").append(html);
    init_milestone_dropdown(id_mm);
  }
}

function del_milestone_field(params) {
  var num = parseInt(
    document.getElementById("add-milestone-button").getAttribute("data-num")
  );

  document
    .getElementById("add-milestone-button")
    .setAttribute("data-num", num - 1);

  var par = "milestone_" + params;
  var rows = document.getElementById("milestone_field").rows;
  var length = rows.length;
  // if (length > 1) {
  var rows = document.getElementById(par);
  rows.remove();
  // }

  cachedAjax({
    cacheKey: url_endpoint + "ajaxGetMilestoneBySact",
    url: url_endpoint + "ajaxGetMilestoneBySact",
    mthod: "GET",
    data: { sact: localStorage.id_subac_detail },
    dataType: "json",
    success: function (data, isCache) {
      $("#milestone_id").html("");
      $.each(data, function (index, value) {
        // if (value.id == params) {
        var html =
          '<option value="' + value.id + '">' + value.text + "</option>";
        $("#milestone_id").append(html);
        // }
      });
    },
  });

  $("#milestone_id").select2({
    dropdownParent: $("#add_report_form>.modal-body>.row"),
    escapeMarkup: function (markup) {
      return markup;
    },
  });
}

function add_attachment() {
  var rows = document.getElementById("attachment_field").rows;
  var id_m = 1;
  if (rows.length > 0) {
    id_m = parseInt(rows[rows.length - 1].id.split("_")[1]) + 1;
  }
  var html = "";
  html += '<tr id="attachment_' + id_m + '">';
  html += "<td>";
  html += '<div class="row d-flex justify-content-between mb-3">';
  html += '<div class="col-10 my-auto ps-0">';
  html +=
    '<input type="file" style="font-size:0.81rem !important;" class="form-control form-control-sm mb-2" name="attachment[]" accept="image/*, application/pdf">';
  html +=
    '<input type="text" style="font-size:0.81rem !important;" class="form-control form-control-sm" name="short_description[]" placeholder="short description...">';
  html += "</div>";
  html += '<div class="col-2 ps-0  p-0 m-0">';
  html +=
    '<button type="button" class="btn btn-danger btn-sm w-100 px-1 h-100" onclick="del_attachment_field(' +
    id_m +
    ')"><i class="uil uil-trash fs-20"></i></button>';
  html += "</div>";
  html += "</div>";
  html += "</td>";
  html += "</tr>";
  $("#attachment_field").append(html);
}

function del_attachment_field(params) {
  var par = "attachment_" + params;
  var rows = document.getElementById("attachment_field").rows;
  var length = rows.length;
  if (length > 0) {
    var rows = document.getElementById(par);
    rows.remove();
  }
}

if (localStorage.wellcome == "ok") {
  toastr.success("Selamat Datang " + localStorage.name);
  localStorage.wellcome = "done";
}

function detailactivity(t) {
  var id = t.getAttribute("data-detail");
  localStorage.id_detail_grievance = id;
  var base_url = base_urlx();
  window.location.href = "detail_activity.html";
}

function opgallery(src) {
  document.getElementById("showgallery").setAttribute("src", src);
  $("#gallery").modal("show");
}

function clearOfflineReport() {
  console.log("clear offline report");
  let userId = localStorage.getItem("id");
  const subacId = localStorage.id_subac_detail;
  let offlineReport = localStorage.getItem(
    "offlineReports_" + subacId + "_" + userId
  );
  if (offlineReport) {
    let offlineReportObj = JSON.parse(offlineReport);
    if (offlineReportObj && offlineReportObj.length > 0) {
      localStorage.removeItem("offlineReports_" + subacId + "_" + userId);
    }
  }
  let pendingListReport = document.getElementById("pending_list_report");
  if (pendingListReport) {
    pendingListReport.innerHTML = "";
  }
}

function sendcomment() {
  // var comment = $('#comment').getContent();
  var comment = tinyMCE.get("comment").getContent();
  let timeout = null; //loading
  var button = $("#bsubmit");
  setLoadingButton(
    $(button),
    true,
    '<span class="eos-icons--bubble-loading"></span>'
  );
  if ($.trim(comment).length < 1) {
    toastr.error("Please fill in comment column");
    setLoadingButton(
      $(button),
      false,
      '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
    );
  } else {
    tinyMCE.get("comment").save();

    if (!navigator.onLine) {
      var fd = new FormData($("#form_comment")[0]);
      fd.append("sub_activity_id", localStorage.id_subac_detail);
      fd.append("sub_activity_report_id", 0);
      fd.append("created_by", localStorage.id);

      const userId = localStorage.id;
      const subacId = localStorage.id_subac_detail;
      const currentDate = new Date();
      const utcMilliseconds = currentDate.getUTCMilliseconds();

      const data = {};

      for (let [key, value] of fd.entries()) {
        if (data[key]) {
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }

      const offlineData = {
        id: utcMilliseconds,
        url: url_endpoint + "send_comment",
        data: data,
        timestamp: new Date().toISOString(),
      };
      let offlineComment =
        JSON.parse(
          localStorage.getItem("offlineComment_" + subacId + "_" + userId)
        ) || [];
      offlineComment.push(JSON.stringify(offlineData));
      console.log(offlineComment);
      localStorage.setItem(
        "offlineComment_" + subacId + "_" + userId,
        JSON.stringify(offlineComment)
      );
      toastr.warning("No internet connection. Comment saved locally.");
      var a_c_html = "";
      a_c_html += `
        <div class="row mt-3 justify-content-center">
          <div class="col-11 mb-2 px-0">
        <div class="card border shadow shadow-lg">
          <div class="card-header px-5 py-3">
        <div class="row">
          <div class="col-2 d-flex justify-content-center">
        <img style="border-radius: 50%;" src="${base_url_endpoint}assets/images/avatars/${
        localStorage.photo
      }" alt="" width="40" height="40">
          </div>
          <div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">
        <b class="mb-0 fs-12 text-dark col-12"> You </b>
        <span class="mb-0 fs-10 col-12" style="color: grey;"> ${changeDateFormat(
          new Date()
        )} </span>
        <span class="badge bg-warning text-dark fs-10">Offline</span>
          </div>
        </div>
          </div>
          <div class="card-body pe-5 ps-5 pt-1 pb-2">
        <div class="fs-12 mb-0">${comment}</div>
          </div>
        </div>
          </div>
        </div>`;
      $("#allcomment").prepend(a_c_html);
      tinyMCE.get("comment").setContent("");
    } else {
      var jqXHR1 = $.ajax({
        type: "GET",
        url: url_endpoint + "get_csrf",
        crossDomain: true,
        cache: false,
        beforeSend: function () {
          timeout = setTimeout(function () {
            toastr.error("Bad signal, please check your connection");
            setLoadingButton(
              $(button),
              false,
              '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
            );
            jqXHR1.abort();
          }, 2000);
        },
        success: function (datay) {
          clearTimeout(timeout);
          var fd = new FormData($("#form_comment")[0]);
          fd.append("sub_activity_id", localStorage.id_subac_detail);
          fd.append("sub_activity_report_id", 0);
          fd.append("created_by", localStorage.id);
          fd.append(datay["name"], datay["token"]);

          let jqXHR2 = $.ajax({
            url: url_endpoint + "send_comment",
            type: "POST",
            crossDomain: true,
            cache: false,
            contentType: false,
            processData: false,
            data: fd,
            beforeSend: function () {
              timeout = setTimeout(function () {
                toastr.error("Bad signal, please check your connection");
                setLoadingButton(
                  $(button),
                  false,
                  '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
                );
                jqXHR2.abort();
              }, 2000);
            },
            success: function (data) {
              clearTimeout(timeout);
              setLoadingButton(
                $(button),
                false,
                '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
              );
              if (data["status"] == "SUCCESS") {
                var allcomment = document.getElementById("allcomment");
                toastr.success(data["message"]);
                var a_c_html = "";
                a_c_html +=
                  '<div class="row mt-3 justify-content-center">' +
                  '<div class="col-11 mb-2 px-0">' +
                  '<div class="card border shadow shadow-lg">' +
                  '<div class="card-header px-5 py-3">' +
                  '<div class="row">' +
                  '<div class="col-2 d-flex justify-content-center">' +
                  '<img style="border-radius: 50%;" src="' +
                  base_url_endpoint +
                  "assets/images/avatars/" +
                  localStorage.photo +
                  '" alt="" width="40" height="40">' +
                  "</div>" +
                  '<div class="col-8 p-0 d-flex flex-wrap" style="align-self: center;">' +
                  '<b class="mb-0 fs-12 text-dark col-12"> You </b>' +
                  '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' +
                  changeDateFormat(new Date()) +
                  "</span > " +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
                  '<div class="fs-12 mb-0">' +
                  comment +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>";
                $("#allcomment").prepend(a_c_html);
                tinyMCE.get("comment").setContent("");
              } else {
                toastr.error(data["message"]);
              }
            },
            error: function (xhr, status, error) {
              clearTimeout(timeout);
              toastr.error(error);
              clearTimeout(timeout);
              setLoadingButton(
                $(button),
                false,
                '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
              );
            },
          });
        },
        error: function (xhr, status, error) {
          clearTimeout(timeout);
          toastr.error(error);
          clearTimeout(timeout);
          setLoadingButton(
            $(button),
            false,
            '<svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor" class="bi bi-send-fill"viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" /></svg>'
          );
        },
      });
    }
  }
  return false;
}

function report_detail(t) {
  var id = t.getAttribute("data-report");
  localStorage.id_subac_report = id;
  window.location.href = "activity_report_detail.html";
}

function submiles() {
  var smilestone = $("#milestone").val();
  if (smilestone != "" && smilestone != null) {
    document.querySelector("#selectmilestone").style.display = "none";
    document.querySelector("#addactivity").style.display = "flex";
    document.querySelector("#footeract").style.display = "flex";
  } else {
    toastr.error("Please select milestone");
    return false;
  }
}
