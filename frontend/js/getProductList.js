const params = new URLSearchParams(location.search);
let id = params.get("id");
let text = "";
console.log(`http://localhost:3000/sp_cate/${id}`);
fetch(`http://localhost:3000/sp_cate/${id}`)
  .then((res) => res.json())
  .then((data) => {
    let text = ``;
    data.forEach((sp) => {
      text += sanphamtheocate(sp);
      document.getElementById(
        "cate"
      ).innerHTML = ` <div id="spmoi" class="listsp">
        <h2>các sản phẩm:</h2>
        <div class="cate">${text}</div>
        </div>`;
    });
  });
const sanphamtheocate = (sp) => {
  return `<a class="sp text-dark text-decoration-none" href="sp.html?id=${sp.san_pham_id}">
  <div class="d-inline-block shadow p-3 mb-5 bg-white rounded" style="height:400px">
      <img src="${sp.san_pham_hinh}" alt="" width="100%" height="280px">
      <div class="dow">
          <p><b class="text-capitalize">${sp.san_pham_ten}</b></p>
          <p><span>${sp.san_pham_gia.toLocaleString('vi')}đ</span><del class="mx-3 text-body-tertiary
          ">${sp.san_pham_gia_km.toLocaleString('vi')}đ</del></p>
          <p hidden>masp:${sp.san_pham_id}</p>
      </div>
      </div>
      </a>`;
};