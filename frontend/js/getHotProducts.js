fetch("http://localhost:3000/sphot/6")
    .then((res) => res.json())
    .then((data) => {
      let text = ``;
      data.forEach((sp) => {
        text += showsp(sp);
        document.getElementById(
          "hot"
        ).innerHTML = ` <div id="spmoi" class="listsp">
        <h2>Sản Phẩm hot</h2>
        <div class="d-flex gap-6">${text}</div>
        </div>`;
      });
    });
  const showsp = (sp) => {
    return `<a class="sp text-dark text-decoration-none" href="sp.html?id=${sp.san_pham_id}">
    <div class="d-inline-block shadow p-3 mb-5 bg-white rounded" style="height:400px">
        <img src="${sp.san_pham_hinh}" alt="" width="100%" height="280px">
        <div class="dow">
            <p><b class="text-capitalize">${sp.san_pham_ten}</b></p>
            <p><span>${sp.san_pham_gia_km.toLocaleString('vi')}đ</span><del class="mx-3 text-body-tertiary
            ">${sp.san_pham_gia.toLocaleString('vi')}đ</del></p>
            <p hidden>masp:${sp.san_pham_id}</p>
        </div>
        </div>
        </a>`;
  };