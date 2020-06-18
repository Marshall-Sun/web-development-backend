var express = require("express");
var router = express.Router();
var connection = require("./mysql");

router.get("/info", (req, res) => {
  const getUsers = () => {
    return new Promise((res) => {
      connection.query("SELECT * FROM user", (err, data) => {
        if (err) {
          console.error(err);
        }
        res(data);
      });
    });
  };

  getUsers().then((userList) => res.send(userList));
});

router.post("/update", (req, res) => {
  const updateUser = (id, email, password, nickname, deptname, shopname) => {
    return new Promise((res) => {
      connection.query(
        "UPDATE user SET " +
          "email = ?, " +
          "password = ?, " +
          "nickname = ?, " +
          "deptname = ?, " +
          "shopname = ? " +
          "WHERE id = ?",
        [email, password, nickname, deptname, shopname, id],
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res(data);
        }
      );
    });
  };

  updateUser(
    req.body.id,
    req.body.email,
    req.body.password,
    req.body.nickname,
    req.body.deptname,
    req.body.shopname
  ).then((data) => {
    res.send({ success: data.changedRows > 0 })
  });
});

router.post("/delete", (req, res) => {  
  const updateUser = (id) => {
    return new Promise((res) => {
      connection.query(`DELETE FROM user where id=${id}`,
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res(data);
        }
      );
    });
  };

  updateUser(req.body.id).then((data) => {
    res.send({ success: data.affectedRows > 0 })
  });
});

module.exports = router;
