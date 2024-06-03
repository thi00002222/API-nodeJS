var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'xth',
  multipleStatements: true
});
 
db.connect(function(err){
    if(err){
        console.log("lỗi khi kết nối database", err);
        db.end();
    }else console.log("Đã kết nối thành công");
});

module.exports=db;