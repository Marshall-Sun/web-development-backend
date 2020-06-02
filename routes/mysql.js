var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "web_development_homework",
  multipleStatements: true
});

connection.connect();

module.exports = connection;
