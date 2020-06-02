var express = require("express");
var router = express.Router();
var connection = require("./mysql");

router.get("/info", (req, res) => {
  getUsers = () => {
    return new Promise((res) => {
      connection.query("SELECT * FROM user", (err, data) => {
        if (err) console.log(err);
        res(data);
      });
    });
  };

  getUsers().then((userList) => {
    var user;
    for (const item of userList) {
      if (req.query.id == item.id) {
        user = item;
      }
    }

    res.send({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      password: user.password,
      data: user.data,
    });
  });
});

module.exports = router;
