var express = require("express");
var router = express.Router();
var connection = require("./mysql");

router.post("/info", (req, res) => {
  var exist = false;

  const getEmail = () => {
    return new Promise((res) => {
      connection.query("SELECT email FROM user", (err, data) => {
        if (err) console.error(err);
        res(data);
      });
    });
  };

  const addUser = (email, password, nickname) => {
    return new Promise((res) => {
      connection.query(
        "ALTER TABLE user AUTO_INCREMENT = 1;" +
          "INSERT INTO user(id, email, password, nickname) VALUES(0, ?, ?, ?)",
        [email, password, nickname],
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res(data);
        }
      );
    });
  };

  getEmail()
    .then((emailList) => {
      for (const item of emailList) {
        if (req.body.email == item.email) {
          exist = true;
        }
      }
    })
    .then(() => {
      if (!exist) {
        addUser(
          req.body.email,
          req.body.password,
          req.body.nickname
        ).then((data) =>
          res.send({ success: !exist, insertId: data[0].insertId })
        );
      }
    });
});

module.exports = router;
