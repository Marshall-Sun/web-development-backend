var express = require("express");
var router = express.Router();
var connection = require("./mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });

  var sql = "SELECT * FROM websites";
  //查
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      return;
    }
    console.log(result);
  });

  connection.end();
});

module.exports = router;
