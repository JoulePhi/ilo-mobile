
$(document).ready(function () {
    $('#createdBy').val(localStorage.id);
    $.ajax({
        type: "GET",
        url: url_endpoint + "get_detail_pres_release?slug="+localStorage.id_pres_release,
        crossDomain: true,
        cache: false,
        success: function (data) {
            datax = data;
            var html = '';
            if (data.status == 'SUCCESS') {
                if(data.data['pres_release']['banner'] == "" || data.data['pres_release']['banner'] == null || data.data['pres_release']['banner'] == undefined){}else{
                    var img_x = base_url_endpoint+'assets/uploads/pres_release/'+data.data['pres_release']['banner'];
                    html += '<div class="card-header d-flex justify-content-center p-1">';
                        html += '<div class="w-100" style="overflow:hidden; height:200px">';
                            html += '<img class="mb-2" style=" width: 100%;height: auto;object-fit: cover;" src=" '+img_x+' " alt="">';
                        html += '</div>';
                    html += '</div>';
                }
                html += '<div class="card-body p-1">';
                    html += '<div class="text-center w-100 my-2">';
                        html += '<h1 style="color:black"> '+data.data['pres_release']['title']+'</h1>';
                    html += '</div>';
                    html += '<div class="text-justify" style="overflow:hidden">'+data.data['pres_release']['description']+'</div>';
                    if(data.data['pres_release']['attachment'] == "" || data.data['pres_release']['attachment'] == null || data.data['pres_release']['attachment'] == undefined){}else{
                        var attachment_x = base_url_endpoint+'assets/uploads/pres_release/'+data.data['pres_release']['attachment'];
                        html += '<div class="mt-1">';
                            // html += '<h5>Attachment</h5>';
                            html += '<div class="d-flex justify-content-center">';
                                html += '<a href="'+attachment_x+'" class="btn btn-primary" download>Download Attachment</a>';
                            html += '</div>';
                        html+= '</div>';
                    }
                html+= '</div>';
                list_report.innerHTML = html;
            }else{
                window.location.href = "pres_release.html";
            }
        }

    });
  

    
if ($('#location').length) {
    getlocation();
}
});