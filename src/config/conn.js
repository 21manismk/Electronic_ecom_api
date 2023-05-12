var mysql = require('mysql');
    
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: 's3_ecom',
  insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});