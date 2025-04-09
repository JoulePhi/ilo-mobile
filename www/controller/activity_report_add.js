document.addEventListener("DOMContentLoaded", function () {
  const selectBox = document.querySelector(".select-box");
  const optionsContainer = document.querySelector(".options-container");
  const optionsList = document.querySelector(".options-list");
  const searchBox = document.querySelector(".search-box");
  const hiddenInput = document.getElementById("location");
  const selectedContainer = document.getElementById("selected-locations");

  let selectedIds = []; // Array untuk menyimpan ID lokasi yang dipilih
  let selectedNames = []; // Array untuk menyimpan nama lokasi

  // Fetch data lokasi dari server
  function fetchLocations(searchTerm = "") {
    cachedAjax({
      url: url_endpoint + "ajaxGetLocationBySact",
      method: "GET",
      data: {
        sact: localStorage.id_subac_detail,
        search: searchTerm,
      },
      dataType: "json",
      success: function (data) {
        optionsList.innerHTML = ""; // Kosongkan sebelum menambahkan opsi baru
        data.forEach((item) => {
          const option = document.createElement("div");
          option.classList.add("option");
          option.textContent = item.text;
          option.setAttribute("data-value", item.id);

          option.addEventListener("click", function () {
            const selectedId = this.getAttribute("data-value");
            const selectedText = this.textContent;
            if (!selectedIds.includes(selectedId) && selectedIds.length < 1) {
              selectedIds.push(selectedId);
              selectedNames.push(selectedText);
              updateSelectedLocations();
            }
          });

          optionsList.appendChild(option);
        });
      },
    });
  }

  // Update tampilan lokasi yang sudah dipilih
  function updateSelectedLocations() {
    selectedContainer.innerHTML = ""; // Kosongkan tampilan sebelumnya
    selectedNames.forEach((name, index) => {
      const badge = document.createElement("span");
      badge.classList.add("badge", "bg-primary", "m-1", "p-2");
      badge.textContent = name;

      // Tombol hapus untuk setiap lokasi yang dipilih
      const removeBtn = document.createElement("span");
      removeBtn.textContent = " X";
      removeBtn.style.cursor = "pointer";
      removeBtn.addEventListener("click", function () {
        selectedIds.splice(index, 1);
        selectedNames.splice(index, 1);
        updateSelectedLocations();
      });

      badge.appendChild(removeBtn);
      selectedContainer.appendChild(badge);
      searchBox.value = "";
      optionsContainer.style.display =
        optionsContainer.style.display === "block" ? "none" : "block";
    });

    hiddenInput.value = JSON.stringify(selectedIds); // Simpan ID dalam input hidden
  }

  // Tampilkan atau sembunyikan dropdown
  selectBox.addEventListener("click", function () {
    optionsContainer.style.display =
      optionsContainer.style.display === "block" ? "none" : "block";
  });

  // Pencarian lokasi
  searchBox.addEventListener("input", function () {
    fetchLocations(this.value);
  });

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", function (e) {
    if (!selectBox.contains(e.target) && !optionsContainer.contains(e.target)) {
      optionsContainer.style.display = "none";
    }
  });

  fetchLocations();
});

$(document).ready(function () {
  var userid = localStorage.id;
  if (userid == null || userid == "undefined") {
    var base_url = base_urlx();
    window.location.href = "index.html";
  }
});
var datax = "";
var dataExpenditure = [];
var type1 = "mandatory";

function setzero(event) {
  // var inputx = event.target.value;
  // if (inputx == "" || inputx == null || inputx == undefined) {
  //   event.target.value = "";
  // }
  // const beneficiery = document.getElementsByClassName(
  //   "activity_report_achievmentx"
  // );
  // var total_beneficiery = 0;
  // for (var i = 0; i < beneficiery.length; i++) {
  //   total_beneficiery =
  //     parseInt(total_beneficiery) + parseInt(beneficiery[i].value);
  // }
  // // console.log(total_beneficiery);
  // var tot_male = document.getElementById("achievment_male_id").value;
  // var tot_female = document.getElementById("achievment_female_id").value;
  // if (tot_male == "") {
  //   tot_male = 0;
  // } else {
  //   tot_male = parseInt(tot_male);
  // }
  // if (tot_female == "") {
  //   tot_female = 0;
  // } else {
  //   tot_female = parseInt(tot_female);
  // }
  // var tot_gender = tot_male + tot_female;
  // // console.log(tot_male);
  // // console.log(tot_female);
  // // console.log(tot_gender);
  // // console.log(total_beneficiery);
  // if (total_beneficiery > tot_gender) {
  //   var min_tot = total_beneficiery - tot_gender;
  //   document.getElementById("beneficiaryArea").innerHTML =
  //     min_tot + " Beneficiary left";
  //   // document.getElementById('submitReportBTN').type = "button";
  // } else if (total_beneficiery == tot_gender) {
  //   document.getElementById("beneficiaryArea").innerHTML = "";
  //   // document.getElementById('submitReportBTN').type = "submit";
  // } else if (total_beneficiery < tot_gender) {
  //   var min_tot2 = tot_gender - total_beneficiery;
  //   document.getElementById("beneficiaryArea").innerHTML =
  //     "excess " + min_tot2 + " Beneficiary";
  //   // document.getElementById('submitReportBTN').type = "button";
  // }
}

$(document).ready(function () {
  cachedAjax({
    method: "GET",
    cacheKey: "get_data_sub_activities_detail",
    url:
      url_endpoint +
      "get_data_sub_activities_detail?id_subac_detail=" +
      localStorage.id_subac_detail,
    crossDomain: true,
    cache: false,
    success: function (data, isCache) {
      datax = data;
      if (data.status == "SUCCESS") {
        $("#sact_id").val(localStorage.id_subac_detail);
        $("#createdBy").val(localStorage.id);
        console.log(localStorage.id_subac_detail);
        console.log();
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
          // html_m += '<label for="date" class="form-label fw-bold text-dark">Beneficiary<span class="text-danger">*</span></label>';
          html_m +=
            '<input type="number" min="0" class="form-control achievement_add_report activity_report_achievmentx" value="0" name="achievment[]">';
          html_m += "</div>";
          html_m +=
            '<div class="col-12 my-auto"> Milestone: ' +
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
          $.each(
            data.data["milestone"][localStorage.id_subac_detail],
            function (index, value) {
              var html =
                '<option value="' + value.id + '">' + value.text + "</option>";
              $("#milestone_id").append(html);
            }
          );
          // init_milestone_dropdown(0);
          $("#btn-add-milestone").html(
            '<button type="button" id="add-milestone-button" class="btn btn-primary btn-sm px-1" data-num="0" onclick="add_milestone(' +
              data.data["milestone"][localStorage.id_subac_detail].length +
              ')">Add Achievement</button>'
          );
        }
        document.getElementById("date").valueAsDate = new Date();
        var list_activity = document.getElementById("list_activity");
        var list_report = document.getElementById("list_report");
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

          // document.getElementById('totmale').innerHTML = male;
          // document.getElementById('totfemale').innerHTML = female;
          // document.getElementById('totalg').innerHTML = totalg;

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

          // getbudget(type1);
          var type =
            '<span class="badge border border-dark bg-bg-white text-dark">Mandatory</span>';
          if (data.data["dactivity"][i]["type"] == "initiative") {
            type =
              '<span class="badge border border-dark bg-bg-white text-dark">Initiative By Partners</span>';
          }

          // list_activity.innerHTML +=
          //     '<div class="col-12 p-0" >' +
          //     '<div class="card shadow-xl border " style=" border-radius: 0 !important;">' +
          //     '<div class="card-header  pb-0 ps-5 pe-5" style="border:none !important;">' +
          //     '<h6 class=" text-dark"  >' +
          //     '<b><b   >' + data.data['dactivity'][i]['sub_tit'] + '</b></b>' +
          //     '</h6>' +
          //     '<div class="col-12 mb-1">' +
          //     status + ' ' + type +
          //     '</div>' +
          //     '<hr class="m-0 mt-2 mb-2">' +
          //     '</div>' +
          //     '<div class="card-body pt-0 ps-5 pe-5">' +
          //     '<div class="row">' +
          //     '<div class="col-12 pe-1">' +
          //     '<p class="mb-0"><b class="text-ilo-dark-blue">Description:</b></p>' +
          //     '<p class="fs-14 text-dark mb-2">' +
          //     data.data['dactivity'][i]['sub_desc'] +
          //     '</p>' +
          //     '</div>' +
          //     '</div>' +
          //     '<div class="row mt-1">' +
          //     '<div class="col-6 pe-1" style="border-right: 1px solid #d2d0d0;">' +
          //     '<p class="card-text text-dark">' +
          //     '<small>' +
          //     '<b class="row"><span >Start Date: </span><span class="text-primary">' + start + '</span></b>' +
          //     '</small>' +
          //     '</p>' +
          //     '</div>' +
          //     '<div class="col-6 pe-1">' +
          //     '<p class="card-text text-dark">' +
          //     '<small>' +
          //     '<b class="row"><span >Due Date: </span><span class="text-danger">' + due + '</span></b>' +
          //     '</small>' +
          //     '</p>' +
          //     '</div>' +
          //     '</div>' +
          //     '<div class="row mt-3">' +
          //     '<div class="col-12">' +
          //     '<div class="row">' +
          //     '<div class="col-12">' +
          //     '<p class="mb-0"><b class="text-ilo-dark-blue">Milestone:</b></p>' +
          //     milestone +

          //     '<p class="mt-3 mb-0"><b class="text-ilo-dark-blue">Locations:</b></p>' +

          //     '<div class="d-flex">' +
          //     '<div class="col-1">' +
          //     '<i class="uil uil-map-pin-alt col-2 p-1 text-ilo-dark-blue"></i>' +
          //     '</div >' +
          //     '<div class="col-10">' +
          //     '<ul class="mb-0 fs-10 ps-4">' +
          //     listcity +
          //     '</ul>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div>' +
          //     '</div >';
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
          // if (m > 0) {
          //     if ((data.data['report'][m]['sub_activity_report_id'] != data.data['report'][m - 1]['sub_activity_report_id'])) {
          //         list_report.innerHTML += '<tr onclick="report_detail(this)" data-report="' + data.data['report'][m]['sub_activity_report_id'] + '">' +
          //             '<td><p class="mb-0" style="text-transform: capitalize" >' + data.data['report'][m]['title'] + '</p></td>' +
          //             '<td>' + achievment +
          //             '</td>' +
          //             '<td class="text-center">' +
          //             '<a onclick="report_detail(this)" data-report="' + data.data['report'][m]['sub_activity_report_id'] + '" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0" > ' +
          //             '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill = "currentColor" class="bi bi-folder2-open" viewBox = "0 0 16 16" > ' +
          //             '<path d = "M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />' +
          //             '</svg>' +
          //             '</a>' +
          //             '</td>' +
          //             '</tr>';
          //     }
          // } else {
          //     list_report.innerHTML += '<tr onclick="report_detail(this)" data-report="' + data.data['report'][m]['sub_activity_report_id'] + '" >' +
          //         '<td><p class="mb-0" style="text-transform: capitalize">' + data.data['report'][m]['title'] + '</p></td>' +
          //         '<td>' + achievment +
          //         '</td>' +
          //         '<td class="text-center">' +
          //         '<a onclick="report_detail(this)" data-report="' + data.data['report'][m]['sub_activity_report_id'] + '" class="btn btn-ilo-green btn-sm p-1 pt-0 pb-0" > ' +
          //         '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill = "currentColor" class="bi bi-folder2-open" viewBox = "0 0 16 16" > ' +
          //         '<path d = "M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z" />' +
          //         '</svg>' +
          //         '</a>' +
          //         '</td>' +
          //         '</tr>';
          // }
        }
        // for (let n = 0; n < data.data['gallery'].length; n++) {
        //     list_gallery.innerHTML += '<div class="col-6 mb-2">' +
        //         '<img style="width:150px !important;height:150px !important;object-fit:cover;" class="rounded" onclick="opgallery(`' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][n]['attachment'] + '`)" src="' + base_url_endpoint + 'assets/uploads/activity_report_attachment/' + data.data['gallery'][n]['attachment'] + '" alt = "" > ' +
        //         '</div>';
        // }
        // for (let o = 0; o < data.data['comment'].length; o++) {
        //     var name = data.data['comment'][o]['name'];
        //     if (data.data['comment'][o]['created_by'] == localStorage.id) {
        //         name = 'You';
        //     }
        //     var t_comment = '';
        //     var title = '';
        //     if (data.data['comment'][o]['sub_activity_report_id'] !== 0 && data.data['comment'][o]['sub_activity_report_id'] !== '0') {
        //         title = data.data['comment'][o]['title'];
        //         t_comment = '<a class="fs-10 text-dark" href="#">Commented on '+title+'</a>';
        //     };
        //     allcomment.innerHTML += '<div class="row mt-3 justify-content-center">' +
        //         '<div class="col-11 mb-2 px-0">' +
        //         '<div class="card border shadow shadow-lg">' +
        //         '<div class="card-header px-5 py-3">' +
        //         '<div class="row">' +
        //         '<div class="col-2 d-flex justify-content-center my-auto">' +
        //         '<img style="border-radius: 50%;" src="' + base_url_endpoint + 'assets/images/avatars/' + data.data['comment'][o]['photo'] + '" alt="" width="40" height="40">' +
        //         '</div>' +
        //         '<div class="col-9 p-0 d-flex flex-wrap" style="align-self: center;">' +
        //         t_comment +
        //         '<b class="my-0 fs-12 text-dark col-12" > ' + name + '</b>' +
        //         '<span class="mb-0 fs-10 col-12" style="color: grey;" > ' + changeDateFormat(data.data['comment'][o]['created_at']) + '</span > ' +
        //         '</div>' +
        //         '</div>' +
        //         '</div>' +
        //         '<div class="card-body pe-5 ps-5 pt-1 pb-2">' +
        //         '<div class="fs-12 mb-0">' +
        //         data.data['comment'][o]['comment'] +
        //         '</div>' +
        //         '</div>' +
        //         '</div>' +
        //         '</div>' +
        //         '</div>';
        // }
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
    let isValid = true;

    // Cek jika ada field yang kosong
    for (let pair of formData.entries()) {
      if (
        !pair[1] &&
        (pair[0] != "achievment_female" || pair[0] != "achievment_male")
      ) {
        // Jika nilainya kosong
        console.log("Field kosong:", pair[0]);
        isValid = false;
      }
    }

    // Jika semua terisi, lanjutkan

    const beneficiery = document.getElementsByClassName(
      "activity_report_achievmentx"
    );
    var total_beneficiery = 0;
    for (var i = 0; i < beneficiery.length; i++) {
      total_beneficiery =
        parseInt(total_beneficiery) + parseInt(beneficiery[i].value);
    }
    // console.log(total_beneficiery);
    var tot_male = document.getElementById("achievment_male_id").value;
    var tot_female = document.getElementById("achievment_female_id").value;

    if (tot_male == "") {
      tot_male = 0;
    } else {
      tot_male = parseInt(tot_male);
    }
    if (tot_female == "") {
      tot_female = 0;
    } else {
      tot_female = parseInt(tot_female);
    }
    var tot_gender = tot_male + tot_female;

    // if(tot_gender == 0 || total_beneficiery == 0){

    // }else if(tot_gender < total_beneficiery ){

    if (!isValid) {
      toastr.error("Please fill in all fields");
      return false; // Mencegah submit jika ada yang kosong
    } else if (total_beneficiery == 0) {
      toastr.error("Select Number of Beneficiary and must be more than 0 Or");
      return false;
    } else {
      if (!navigator.onLine) {
        const userId = localStorage.id;
        const subacId = localStorage.id_subac_detail;
        const currentDate = new Date();
        const utcMilliseconds = currentDate.getUTCMilliseconds();

        const data = {};

        for (let [key, value] of formData.entries()) {
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
          url: url_endpoint + "ajaxAddReport",
          data: data,
          timestamp: new Date().toISOString(),
        };
        let offlineReports =
          JSON.parse(
            localStorage.getItem("offlineReports_" + subacId + "_" + userId)
          ) || [];
        offlineReports.push(JSON.stringify(offlineData));
        console.log(offlineReports);
        localStorage.setItem(
          "offlineReports_" + subacId + "_" + userId,
          JSON.stringify(offlineReports)
        );
        toastr.warning("No internet connection. Report saved locally.");
        setTimeout(function () {
          window.location.href = "activity.html";
        }, 2000);
      } else {
        // Proceed with AJAX request if online
        $.ajax({
          type: "POST",
          url: url_endpoint + "ajaxAddReport",
          data: formData,
          dataType: "json",
          contentType: false,
          processData: false,
          success: function (data) {
            if (data.status == "success") {
              toastr.success("Report has been saved");

              setTimeout(function () {
                window.location.href = "activity.html";
              }, 2000);
            } else {
              Swal.fire({
                title: "Add Report Failed",
                text: "Failed to add report, please try again later",
                icon: "error",
              });
            }
          },
        });
      }
    }
  });

  // getlocation();
  // init_milestone_dropdown(0);
});

function getbudget(type1) {
  if (type1 == "mandatory") {
    document.getElementById("acEndBudget").style.display = "flex";
    cachedAjax({
      method: "GET",
      cacheKey: "ajax_get_budget_expansive/" + localStorage.id_subac_detail,
      url:
        url_endpoint +
        "ajax_get_budget_expansive/" +
        localStorage.id_subac_detail,
      crossDomain: true,
      cache: false,
      success: function (data2, isCache) {
        if (data2.status == "SUCCESS") {
          dataExpenditure = data2["data"];
          var list_expenditure = document.getElementById("list_expenditure");
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

            list_expenditure.innerHTML +=
              '<tr onclick="showExpenditure(' +
              data2["data"][e]["id"] +
              ')" >' +
              '<td><p class="mb-0" style="text-transform: capitalize">' +
              data2["data"][e]["title"] +
              "</p></td>" +
              "<td>" +
              stat +
              "</td>" +
              '<td class="text-center">' +
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
              "</tr>";
          }
        }
      },
    });
  }
}

function showExpenditure(id) {
  $("#ActivityExpenditureModal").modal("show");

  var sact_id = document.getElementById("expsact_id");
  var createdBy = document.getElementById("expcreatedBy");
  var expuser = document.getElementById("expuser");
  var expphoto = document.getElementById("expphoto");
  var expname = document.getElementById("expname");
  var expstatus = document.getElementById("expstatus");
  var exptitle = document.getElementById("exptitle");
  var expbudget = document.getElementById("expbudget");
  var expdate = document.getElementById("expdate");
  var expdescription = document.getElementById("expdescription");
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
    var fdata = [];

    for (var i = 0, len = dataExpenditure.length; i < len; i++) {
      if (parseInt(dataExpenditure[i]["id"]) === id) {
        fdata = dataExpenditure[i];
        break;
      }
    }

    var status = "";
    if (fdata["status"] == "1") {
      status =
        '<span class="badge badge-success bg-success text-white fs-10">Approved</span>';
    } else if (fdata["status"] == "2") {
      status =
        '<span class="badge badge-danger bg-danger text-white fs-10">Rejected</span>';
    } else {
      status =
        '<span class="badge badge-warning bg-warning text-dark fs-10">Pending</span>';
    }

    expsubmit.style.display = "none";
    expdescription.style.display = "none";
    expdescription2.style.display = "block";

    expuser.style.display = "flex";

    expphoto.setAttribute(
      "src",
      base_url_endpoint + "assets/images/avatars/" + fdata["photo"]
    );
    expname.innerHTML = fdata["name"];
    expstatus.innerHTML = status;
    exptitle.value = fdata["title"];
    expbudget.value = fdata["budget"];
    expdate.value = fdata["date"];
    expdescription2.innerHTML = fdata["description"];

    exptitle.setAttribute("readonly", "readonly");
    expbudget.setAttribute("readonly", "readonly");
    expdate.setAttribute("readonly", "readonly");
    expdescription2.setAttribute("readonly", "readonly");
  } else {
    sact_id.value = localStorage.id_subac_detail;
    createdBy.value = localStorage.id;

    expsubmit.style.display = "block";
    expuser.style.display = "none";

    expdescription.style.display = "block";
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
  var expbudget = document.getElementById("expbudget").value;
  var expdate = document.getElementById("expdate").value;
  var expdescription = document.getElementById("expdescription").value;

  if (
    exptitle == "" ||
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
    $.ajax({
      type: "POST",
      url: url_endpoint + "ajax_add_expenditure",
      data: expformData,
      // data: form,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (data) {
        if (data.status == "SUCCESS") {
          window.location.href = "detail_activity.html";
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

// function getlocation() {

//     $.ajax({
//         url: url_endpoint + 'ajaxGetLocationBySact',
//         type: 'GET',
//         data: { sact: localStorage.id_subac_detail },
//         dataType: 'json',
//         success: function (data) {
//             $("#location").html('');
// $.each(data, function (index, value) {
//     var html = '<option value="' + value.id + '">' + value.text + '</option>';
//     $("#location").append(html);
// });
//         }
//     });

//     $("#location").select2();
// }

function init_milestone_dropdown(id_m) {
  cachedAjax({
    url: url_endpoint + "ajaxGetMilestoneBySact",
    method: "GET",
    data: { sact: localStorage.id_subac_detail },
    dataType: "json",
    success: function (data, isCache) {
      if (data.length > 1) {
        document.getElementById("fmiles").style.display = "block";
        $("#milestone_id").html("");
        $.each(data, function (index, value) {
          if (value.id != id_m) {
            var html =
              '<option value="' + value.id + '">' + value.text + "</option>";
            $("#milestone_id").append(html);
          }
        });

        // $('#milestone_id').select2();
      } else {
        document.getElementById("fmiles").style.display = "none";
      }
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
    var selectobject = document.getElementById("milestone_id");
    for (var i = 0; i < selectobject.length; i++) {
      if (selectobject.options[i].innerHTML == text_mm) {
        selectobject.remove(i);
      }
    }
    if (selectobject.length < 1) {
      document.getElementById("add_milestonex").style.display = "none";
    }

    // if (currentIndex !== -1) {
    //     selectElement.options[currentIndex].style.display = 'none';
    //     const nextIndex = currentIndex + 1;
    //     if (nextIndex < options.length) {
    //         selectElement.selectedIndex = nextIndex;
    //         options[nextIndex].setAttribute('selected', 'selected');
    //     } else {
    //         console.log('No more options available');
    //     }
    // }

    var html = "";
    html += '<tr id="milestone_' + id_mm + rows.length + '">';
    html += '<td colspan="2">';
    html += '<div class=" d-flex flex-wrap justify-content-between">';
    // html += '<div class="col-5">';
    // html += '<input type="number" min="0" class="form-control achievement_add_report" value="0" name="achievment[]">';
    // html += '</div>';
    // html += '<div class="col-7"> on '+text_mm;
    // // html += '<select class="form-select form-select milestone_dropdown" id="activity_report_milestone_' + id_mm + '" name="milestone[]"></select>';
    // html += '<input type="hidden" id="activity_report_milestone_' + id_mm + '" name="milestone[]" value="'+id_mm+'">';
    // html += '</div>';

    // html += '<label class="form-label fw-bold text-dark">Achievement '+datnum+'<label class="text-danger">*</label></label>';
    // html += ' <label for="date" class="form-label fw-bold text-dark">Beneficiary<span class="text-danger">*</span></label>';
    html += '<div class="col-9">';
    html +=
      '<input type="number" min="0" class="form-control achievement_add_report activity_report_achievmentx" value="0" oninput="setzero(event)" name="achievment[]" required>';
    html += "</div>";
    html += '<div class="col-3">';
    html +=
      '<button type="button" class="btn btn-danger w-100 h-100 p-1 " onclick="del_milestone_field(this)"  data-id_del="' +
      id_mm +
      rows.length +
      '" data-id="' +
      id_mm +
      '" data-value="' +
      text_mm +
      '"><i class="fs-20 uil uil-trash"></i></button>';
    html += "</div>";
    html += '<div class="col-12 my-auto">';
    // html += '<select class="form-select form-select milestone_dropdown" id="activity_report_milestone_' + 1 + '" name="milestone[]"></select>';
    html +=
      '<input type="hidden" required id="activity_report_milestone_' +
      id_mm +
      '" name="milestone[]" value="' +
      id_mm +
      '">';
    html += "</div>Milestone: " + text_mm;
    html += "</div>";
    html += "</td>";
    html += "</tr>";
    $("#milestone_field").append(html);
    // init_milestone_dropdown(id_mm);
  }
}

function del_milestone_field(params) {
  var id_del = params.getAttribute("data-id_del");
  var id = params.getAttribute("data-id");
  var value = params.getAttribute("data-value");
  var num = parseInt(
    document.getElementById("add-milestone-button").getAttribute("data-num")
  );

  document
    .getElementById("add-milestone-button")
    .setAttribute("data-num", num - 1);

  var par = "milestone_" + id_del;
  var rows = document.getElementById("milestone_field").rows;
  var length = rows.length;
  // if (length > 1) {
  var rows = document.getElementById(par);
  rows.remove();
  // }

  // $.ajax({
  //     url: url_endpoint + 'ajaxGetMilestoneBySact',
  //     type: 'GET',
  //     data: { sact: localStorage.id_subac_detail },
  //     dataType: 'json',
  //     success: function (data) {
  //         $("#milestone_id").html('');
  //         $.each(data, function (index, value) {
  //             // if (value.id == params) {
  //                 var html = '<option value="' + value.id + '">' + value.text + '</option>';
  //                 $("#milestone_id").append(html);
  //             // }
  //         });
  //     }
  // });;
  html = '<option value="' + id + '">' + value + "</option>";

  $("#milestone_id").append(html);
  // $('#milestone_id').select2();
  document.getElementById("add_milestonex").style.display = "flex";
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
              toastr.success(data["message"]);
              var allcomment = document.getElementById("allcomment");
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
