var db = require("../models/database")
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    let limit = '';
if (req.query._limit != undefined){
            let sosp = req.query._limit
            if (sosp <= 0) sosp = 10;
            limit = `LIMIT 0, ${sosp}`
    }
    let xep = '';
    if (req.query._sort != undefined) {
        let str = req.query._sort
        xep = `order by ${str} asc`
    }
    let sql = `SELECT * FROM products ${xep} ${limit}`;
    db.query(sql, (err, data) => {
        if (err) res.json({ 'thongbao': `lỗi :${err}` })
        else res.json(data)
    });
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    if(isNaN(id)==true){
        res.json({'thongbao':id+' không tồn tại'})
        return;
    }
    let sql=`select * from products where san_pham_id=?`;
    db.query(sql,id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else if(data.length==0) res.json({'thongbao':'sản phẩm không tồn tại'});
        else res.json(data[0])
});
});

router.post('/', function (req, res) {
    let tt = req.body;
    let sql = `INSERT INTO products SET ?`;
    db.query(sql, tt, (err, d) => {
        if (err) res.json({ 'loi': `lỗi :${err}` })
        else res.json({'thongbao':'done'})
    });
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    if(isNaN(id)==true){
        res.json({'thongbao':id+' không tồn tại'})
        return;
    }
    let tt = req.body;
    let sql=`update products set? where san_pham_id=?`;
    db.query(sql,[tt,id],function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã sửa'})
});
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    let sql=`delete from products where san_pham_id=?`;
    db.query(sql,   id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã xóa'})
});
});

module.exports = router;