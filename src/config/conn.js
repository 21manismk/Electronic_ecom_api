var mysql = require('mysql');
    
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin@123",
  database: 's3_ecom',
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection