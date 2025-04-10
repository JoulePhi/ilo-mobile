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

function formDataToString(formData) {
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    params.append(key, value);
  }
  return params.toString();
}

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function base64ToFile(base64String, fileName, fileType) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  const blob = new Blob(byteArrays, { type: fileType });
  return new File([blob], fileName, { type: fileType });
}
