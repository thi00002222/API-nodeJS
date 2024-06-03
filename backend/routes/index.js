var db = require("../models/database")
var express = require('express');
var router = express.Router();

router.get('/spmoi/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu dữ liệu' }); return
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT * from products WHERE san_pham_an_hien=1 order by san_pham_ngay desc limit 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/spxemnhieu/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu dữ liệu' }); return
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT * from products WHERE san_pham_an_hien=1 order by san_pham_xem desc limit 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/sphot/:sosp', (req, res) => {
  if (isNaN(req.params.sosp) == true) {
    res.json({ 'thongbao': 'sai kiểu dữ liệu' }); return
  }
  let sosp = req.params.sosp;
  if (sosp <= 0) sosp = 10;
  let sql = `SELECT * from products WHERE san_pham_an_hien=1 and san_pham_hot=1 order by san_pham_ngay desc limit 0, ${sosp}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/sp/:id', (req, res) => {
  if (isNaN(req.params.id) == true) {
    res.json({ 'thongbao': 'sai kiểu dữ liệu' }); return
  }
  let id = req.params.id;
  if (id <= 0) id = 10;
  let sql = `SELECT * from products WHERE san_pham_id= ${id}`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/sp_cate/:id', (req, res) => {
  if (isNaN(req.params.id) == true) {
    res.json({ 'thongbao': 'sai kiểu dữ liệu' }); return
  }
  let id = req.params.id;
  if (id <= 0) id = 10;
  let sql = `SELECT * from products WHERE san_pham_an_hien = 1 and san_pham_id_cate=${id} order by san_pham_ngay desc`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/list_nhasx', (req, res) => {
  let sql = `SELECT * from categories WHERE categories_an_hien = 1`;
  db.query(sql, (err, data) => {
    if (err) res.json({ 'thongbao': `lỗi :${err}` })
    else res.json(data)
  });
})

router.get('/cate/:id', function (req, res) {
  let id = req.params.id;
  if(isNaN(id)==true){
      res.json({'thongbao':id+' không tồn tại'})
      return;
  }
  let sql=`select * from categories where categories_id=?`;
  db.query(sql,id,function(err,data){
      if(err) res.json({'thongbao':`lỗi ${err}`});
      else if(data.length==0) res.json({'thongbao':'sản phẩm không tồn tại'});
      else res.json(data[0])
});
});

module.exports = router;
