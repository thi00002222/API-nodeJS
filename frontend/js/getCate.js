let nav = "";
  fetch("http://localhost:3000/list_nhasx")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((nsx) => {
        nav += showMenuItem(nsx);
        document.getElementById("menu").innerHTML = nav;
      });
    });
  const showMenuItem = (nsx) => {
    return `<li class="d-inline-block mx-3 py-3"><a class="text-black text-decoration-none" href="cate.html?id=${nsx.categories_id}">${nsx.categories_ten}</a></li>`;
  };