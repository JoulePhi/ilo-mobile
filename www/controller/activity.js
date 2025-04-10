function uploadLocalData() {
  const userId = localStorage.getItem("id");
  const subacId = localStorage.getItem("id_subac_detail");
  var localActivity = localStorage.getItem(
    "offlineActivity_" + subacId + "_" + userId
  );
  console.log(localActivity);
  localActivity = JSON.parse(localActivity);
  let localActivityLength = 0;
  let localActivityCount = 0;

  if (localActivity) {
    Swal.fire({
      title: "Sending Offline Data",
      html: "Please wait while we send your data.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  if (localActivity) {
    localActivityLength = localActivity.length;
    localActivity.reverse();
    for (let i = 0; i < localActivity.length; i++) {
      const formData = new FormData();
      let reports = JSON.parse(localActivity[i]);
      let ofReport = reports["data"];
      for (const key in ofReport) {
        if (ofReport.hasOwnProperty(key)) {
          const value = ofReport[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, value);
          }
        }
      }
      console.log(formData);
      $.ajax({
        type: "POST",
        url: reports["url"],
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.status == "success") {
            localActivity.splice(i, 1);
            localStorage.setItem(
              "offlineActivity_" + subacId + "_" + userId,
              JSON.stringify(localActivity)
            );
            localActivityCount++;
            if (localActivityCount == localActivityLength) {
              localStorage.removeItem(
                "offlineActivity_" + subacId + "_" + userId
              );
              console.log("All local data have been sent");
              toastr.success("All local data have been sent");
              setTimeout(function () {
                location.reload();
              }, 1000);
            }
          } else {
            Swal.fire({
              title: "Add Activity Failed",
              text: "Failed to add report, please try again later",
              icon: "error",
            });
          }
        },
      });
    }
  }
}

$(document).ready(function () {
  var userid = localStorage.id;
  if (userid == null || userid == "undefined") {
    var base_url = base_urlx();
    window.location.href = "index.html";
  }
});

var datax = "";
$(document).ready(function () {
  var list_activity = document.getElementById("list_activity");
  const userId = localStorage.getItem("id");
  const subacId = localStorage.getItem("id_subac_detail");
  var localActivity = localStorage.getItem(
    "offlineActivity_" + subacId + "_" + userId
  );
  console.log(localActivity);
  localActivity = JSON.parse(localActivity);
  const localActivityLength = 0;
  let localActivityCount = 0;
  if (localActivity) {
    if (navigator.onLine) {
      uploadLocalData();
    }
    localActivityCount = localActivity.length;
    localActivity.reverse();

    for (let i = 0; i < localActivity.length; i++) {
      let activity = JSON.parse(localActivity[i]);
      let actData = activity["data"];
      var border_color = "#FF6F00";
      var code_color = "#FF6F00";
      var start = changeDateFormat2(actData["start_date"]);
      var due = changeDateFormat2(actData["due_date"]);
      var lsitcity = "";
      let cachedLocation = localStorage.getItem(
        url_endpoint + "/get_data_location"
      );
      console.log("cachedLocation", cachedLocation);
      if (cachedLocation) {
        let dataLocation = JSON.parse(cachedLocation);
        let selectedLocations = dataLocation.filter((item) =>
          actData["locations"].includes(item.id)
        );
        console.log("selectedLocations", JSON.stringify(selectedLocations));
        let locationNames = selectedLocations.map(
          (location) => location.type + " " + location.name
        );
        for (let j = 0; j < locationNames.length; j++) {
          lsitcity += '<li class="fw-bold fs-12">' + locationNames[j] + "</li>";
        }
      }
      list_activity.innerHTML +=
        '<div class="row mb-5">' +
        '<div class="col-12" >' +
        '<div class="card shadow-xl border ' +
        border_color +
        '" style="box-shadow: 0px -5px ' +
        code_color +
        ' !important;">' +
        '<div class="card-header text-ilo-dark-blue pb-0 ps-5 pe-5" style="border:none !important;">' +
        '<a href="javascript:void(0)" class="title-text" ><h6 class="text-dark " >' +
        "<b><b>" +
        actData["title"] +
        "</b></b>" +
        "</h6></a>" +
        '<div class="row">' +
        '<div class="col-12 mb-1">' +
        '<span class="badge badge-warning bg-danger">Offline</span>' +
        " " +
        '<span class="badge border border-dark bg-bg-white text-dark">Mandatory</span>' +
        "</div>" +
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
        '<hr class="m-0 mt-2 mb-2">' +
        "</div>" +
        '<div class="card-body pt-0 ps-5 pe-5">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<p class="mb-0"><b class="text-ilo-dark-blue">Milestone:</b></p>' +
        "" +
        '<p class="mt-3 mb-0"><b class="text-ilo-dark-blue">Locations:</b></p>' +
        '<div class="d-flex">' +
        '<div class="col-1">' +
        '<i class="uil uil-map-pin-alt col-2 p-1 text-ilo-dark-blue"></i>' +
        "</div >" +
        '<div class="col-10">' +
        '<ul class="mb-0 fs-10 ps-4">' +
        lsitcity +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="row">' +
        '<div class="col-12 text-center">' +
        "" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div >" +
        "</div >";
    }
  }
  cachedAjax({
    url: url_endpoint + "get_data_sub_activities?id_user=" + localStorage.id,
    cacheKey: "get_data_sub_activities",
    success: function (data, isCached) {
      if (isCached) {
        console.log("Data diambil dari cache");
      } else {
        console.log("Data diambil dari server");
      }
      if (data.status == "SUCCESS") {
        if (data.data["dactivity"].length > 0) {
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
                '<p class="mb-0 text-ilo-dark-blue fs-14">' +
                data.data["milestone"][sub_activity_id][j]["measures"] +
                " " +
                data.data["milestone"][sub_activity_id][j]["unit"] +
                " by " +
                changeDateFormat3(
                  data.data["milestone"][sub_activity_id][j]["timeline"]
                ) +
                "</p>";
              // milestone += '<p class="mb-0 text-ilo-dark-blue fs-14">' + data.data['milestone'][sub_activity_id][j]['measures'] + ' ' + data.data['milestone'][sub_activity_id][j]['unit'] + ' by ' + changeDateFormat3(data.data['milestone'][sub_activity_id][j]['timeline']) + '</p>' +
              //     '<div class="progress " role="progressbar" aria - label="Example with label" aria - valuenow="25" aria - valuemin="0" aria - valuemax="100" style = "border-radius: 5px;background: #d3d3d3;" > ' +
              //     '<div class="progress-bar fs-10" style="width: ' + width + ';height: 20px;background-color:' + background + ';color:#fff;border-radius: 3px;text-align: center;font-weight: 900;"><small style="position: absolute;">' + percent + ' %</small>' +
              //     '</div>' +
              //     '</div>';
            }
            var listcity = "";
            for (
              let l = 0;
              l < data.data["city"][sub_activity_id].length;
              l++
            ) {
              var type = "Kota";
              if (
                data.data["city"][sub_activity_id][l]["type"] == "Kabupaten"
              ) {
                type = "Kab. ";
              }
              listcity +=
                '<li class="fw-bold fs-12">' +
                type +
                " " +
                data.data["city"][sub_activity_id][l]["city"] +
                "</li>";
            }
            if (data.data["dactivity"][i]["type"] == "mandatory") {
              var detail_btn =
                '<button type="button" data-detail="' +
                sub_activity_id +
                '" onclick="detailactivity(this)" class="btn btn-danger btn-sm w-100 mt-5">View Detail</button>';
              var border_color = "border-ilo-dark-blue";
              var code_color = "#1E2DBE";
            } else {
              var border_color = "#FF6F00";
              var code_color = "#FF6F00";
              if (data.data["dactivity"][i]["aproval"] == "approved") {
                var detail_btn =
                  '<button type="button" data-detail="' +
                  sub_activity_id +
                  '" onclick="detailactivity(this)" class="btn btn-danger btn-sm w-100 mt-5">View Detail</button>';
              } else if (data.data["dactivity"][i]["aproval"] == "rejected") {
                if (data.data["dactivity"][i]["creator"] == localStorage.id) {
                  var detail_btn =
                    '<button type="button" class="btn btn-danger btn-sm w-100 mt-5 disabled" disabled style=" text-transform: capitalize;">' +
                    data.data["dactivity"][i]["aproval"] +
                    "</button>";
                  detail_btn +=
                    '<button type="button" onclick="detailactivity2(this)" data-detail="' +
                    sub_activity_id +
                    '" class="btn btn-warning btn-sm btn-revision-act mx-2 mt-5" style="width:40%;">Revision</button>';
                  detail_btn +=
                    '<button type="button" onclick="del_sub_act(' +
                    data.data["dactivity"][i]["sub_activity_id"] +
                    ')" class="btn btn-danger btn-sm mx-2 mt-5" style="width:40%;"><i class="uil uil-trash-alt"></i></button>';
                } else {
                  var detail_btn =
                    '<button type="button" class="btn btn-danger btn-sm w-100 mt-5 disabled" disabled style=" text-transform: capitalize;">' +
                    data.data["dactivity"][i]["aproval"] +
                    "</button>";
                }
              } else {
                var detail_btn =
                  '<button type="button" class="btn btn-danger btn-sm w-100 mt-5 disabled" disabled style=" text-transform: capitalize;">' +
                  data.data["dactivity"][i]["aproval"] +
                  "</button>";
              }
            }

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

            var type =
              '<span class="badge border border-dark bg-bg-white text-dark">Mandatory</span>';

            if (data.data["dactivity"][i]["type"] == "initiative") {
              type =
                '<span class="badge border border-dark bg-bg-white text-dark">Initiative By Partners</span>';
            }

            var indicator_target = "";
            // console.log(sub_activity_id);
            // console.log(data.data['indicator_target'][sub_activity_id].length);
            for (
              let j = 0;
              j < data.data["indicator_target"][sub_activity_id].length;
              j++
            ) {
              indicator_target +=
                '<p class="mb-0 text-ilo-dark-blue fs-14">' +
                data.data["indicator_target"][sub_activity_id][j]["measures"] +
                " " +
                data.data["indicator_target"][sub_activity_id][j]["unit"] +
                " by " +
                changeDateFormat3(
                  data.data["indicator_target"][sub_activity_id][j]["timeline"]
                ) +
                "</p>";
            }
            list_activity.innerHTML +=
              '<div class="row mb-5">' +
              '<div class="col-12" >' +
              '<div class="card shadow-xl border ' +
              border_color +
              '" style="box-shadow: 0px -5px ' +
              code_color +
              ' !important;">' +
              '<div class="card-header text-ilo-dark-blue pb-0 ps-5 pe-5" style="border:none !important;">' +
              '<a href="javascript:void(0)" data-detail="' +
              sub_activity_id +
              '" class="title-text"  onclick="detailactivity(this)" ><h6 class="text-dark " >' +
              "<b><b>" +
              data.data["dactivity"][i]["sub_tit"] +
              "</b></b>" +
              "</h6></a>" +
              '<div class="row">' +
              '<div class="col-12 mb-1">' +
              status +
              " " +
              type +
              "</div>" +
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
              '<hr class="m-0 mt-2 mb-2">' +
              "</div>" +
              '<div class="card-body pt-0 ps-5 pe-5">' +
              '<div class="row">' +
              '<div class="col-12">' +
              '<div class="row">' +
              '<div class="col-12">' +
              '<p class="mb-0"><b class="text-ilo-dark-blue">Milestone:</b></p>' +
              indicator_target +
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
              '<div class="row">' +
              '<div class="col-12 text-center">' +
              detail_btn +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div >" +
              "</div >";

            $("#base_wrapper").removeClass("my-auto");
          }
        } else {
          list_activity.innerHTML +=
            '<div class="row my-auto"><div class="col-12 text-center"><img style="width:60%;" src="' +
            base_url_endpoint +
            "assets/images/empty_act.png" +
            '" alt=""></div><div class="col-12"><h6 class="text-center">No Activity Yet</h6><p class="text-center">Please create initiative report or waiting to assign activity from admin</p></div></div>';
          $("#base_wrapper").addClass("my-auto");
          //     list_activity.innerHTML += '';
          //         list_activity.innerHTML += '';
          //     list_activity.innerHTML += '';
          //     list_activity.innerHTML += '';
          //         list_activity.innerHTML += '';
          //         list_activity.innerHTML += '';
          //     list_activity.innerHTML += '';
          // list_activity.innerHTML += '';
        }
      }
    },
  });
});

function del_sub_act(params) {
  cachedAjax({
    url: url_endpoint + "delSubAct",
    cacheKey: "delSubAct",
    method: "POST",
    data: {
      id: params,
    },
    success: function (data) {
      var datax = JSON.parse(data);
      if (datax.status == "success") {
        location.reload();
      } else {
        Swal.fire({
          title: "Delete Failed",
          text: "Failed to delete activity, please try again later",
          icon: "error",
        });
      }
    },
  });
}

if (localStorage.wellcome == "ok") {
  toastr.success("Selamat Datang " + localStorage.name);
  localStorage.wellcome = "done";
}

function detailactivity(t) {
  var id = t.getAttribute("data-detail");
  localStorage.id_subac_detail = id;
  window.location.href = "detail_activity.html";
}

function detailactivity2(t) {
  var id = t.getAttribute("data-detail");
  localStorage.id_subac_detail = id;
  window.location.href = "detail_activity_revision.html";
}
