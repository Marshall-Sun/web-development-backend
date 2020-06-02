var express = require("express");
var router = express.Router();
var connection = require("./mysql");

router.post("/info", (req, res) => {
  getUsers = () => {
    return new Promise((res) => {
      connection.query("SELECT * FROM user", (err, data) => {
        if (err) console.log(err);
        res(data);
      });
    });
  };

  getUsers().then((userList) => {
    var exist = false,
      rightPass = false,
      user;
    for (const item of userList) {
      if (req.body.email == item.email) {
        exist = true;
        rightPass = req.body.password == item.password;
        user = item;
      }
    }

    res.send({ exist: exist, rightPass: rightPass, user: user });
  });
});

module.exports = router;
