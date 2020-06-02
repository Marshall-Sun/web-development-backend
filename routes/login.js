var express = require("express");
var router = express.Router();
var userList = require('./userList');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a login");
});

router.post("/info", (req, res) => {
  var exist = false, rightPass = false;
  var user;
  for (const item of userList) {
    if (req.body.email == item.email) {
      exist = true;
      rightPass = req.body.password == item.password;
      user = item;
    }
  }

  res.send({ exist: exist, rightPass: rightPass, user: user });
});

module.exports = router;
