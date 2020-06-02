var express = require("express");
var router = express.Router();
var connection = require("./mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });

  getWebsites = () => {
    return new Promise((res) => {
      connection.query("SELECT * FROM websites", (err, data) => {
        if (err) reject(err);
        res(data);
      });
    });
  };

  getWebsites().then((results) => {
    for (const item of results) {
      console.log(item.name);
    }
  });

  connection.end();
});

module.exports = router;
