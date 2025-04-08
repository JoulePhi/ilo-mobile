function cachedAjax(options) {
  let cacheKey = options.url;
  let userId = localStorage.getItem("id");
  if (!cacheKey) {
    console.error("cacheKey harus disediakan di options");
    return;
  }
  if (!userId) {
    console.error("User ID tidak ditemukan di localStorage");
    window.location.href = "login.html";
    return;
  }
  cacheKey = `${cacheKey}_${userId}`;

  $.ajax({
    url: options.url,
    method: options.method || "GET",
    data: options.data || {},
    dataType: options.dataType || "json",
    success: function (response) {
      localStorage.setItem(cacheKey, JSON.stringify(response));

      if (typeof options.success === "function") {
        options.success(response, false);
      }
    },
    error: function (xhr, status, error) {
      let cached = localStorage.getItem(cacheKey);
      if (cached) {
        let data = JSON.parse(cached);
        if (typeof options.success === "function") {
          options.success(data, true);
        }
      } else {
        if (typeof options.error === "function") {
          options.error(xhr, status, error);
        } else {
          console.warn("Gagal ambil data dan tidak ada cache:", options.url);
        }
      }
    },
  });
}
