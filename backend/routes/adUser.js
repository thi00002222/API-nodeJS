var db = require("../models/database")
var express = require('express');
var bcrypt = require('bcryptjs');
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
    let sql = `SELECT * FROM users ${xep} ${limit}`;
    db.query(sql, (err, data) => {
        if (err) res.json({ 'thongbao': `lỗi :${err}` })
        else res.json(data)
    });
});

router.post('/', async function (req, res) {
    let {users_id,users_ho, users_ten, users_mat_khau, users_email} = req.body;
var salt = await bcrypt.genSaltSync(10);
var change = await bcrypt.hash(users_mat_khau,salt)
    let sql = `INSERT INTO users(users_id,users_ho,users_ten,users_mat_khau,users_email) values(${users_id},'${users_ho}','${users_ten}','${change}','${users_email}')`
    db.query(sql, (err, d) => {
        if (err) res.json({ 'loi': `lỗi :${sql}` })
        else res.json({'thongbao':req.body})
    });
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    if(isNaN(id)==true){
        res.json({'thongbao':id+' không tồn tại'})
        return;
    }
    let tt = req.body;
    let sql=`update users set? where users_id=?`;
    db.query(sql,[tt,id],function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã sửa'})
});
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    let sql=`delete from users where users_id=?`;
    db.query(sql,   id,function(err,data){
        if(err) res.json({'thongbao':`lỗi ${err}`});
        else res.json({'thongbao':'đã xóa'})
});
});

module.exports = router;