const params = new URLSearchParams(location.search);
  let id = params.get("id");
  let text = "";
  
  fetch("http://localhost:3000/sp/" + id)
    .then((res) => res.json())
    .then((data) => {
      let text = ``;
      data.forEach((sp) => {
        text += showchitietSP(sp);
        document.getElementById("sp").innerHTML = ` <div id="chitiet">
        <h2>Chi Tiết Sản Phẩm</h2>
        <div id="data" class="d-flex gap-5 container">${text}</div>
        </div>`;
      });
    });
  const showchitietSP = (sp) => {
    // console.log(sp);
    return `<div id='left' class="w-50%">
      <img src="${sp.san_pham_hinh}">
      </div>
      <div id='right'>
          <p class="text-capitalize"><b>Tên Sản Phẩm : </b>${sp.san_pham_ten} </p>
          <p><del>Giá Gốc: ${sp.san_pham_gia.toLocaleString('vi')}đ</del> &nbsp &nbsp; <b class="text-danger">Giá hiện tại: ${sp.san_pham_gia_km.toLocaleString('vi')}đ</b></p>
          <form>
          <input type="number" class="form-control d-inline-block w-50" name="soluong" min="1" value="1">
          <input type="button" class="btn btn-info float-end" value="Thêm vào giỏ hàng"></br>
          <input type="button" class="w-100 btn btn-primary my-3" value="mua ngay">
          </form>  `;
  };