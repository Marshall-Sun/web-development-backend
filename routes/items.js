var express = require("express");
var router = express.Router();
var connection = require("./mysql");

router.get("/info", (req, res) => {
  const getItems = () => {
    return new Promise((res) => {
      connection.query("SELECT * FROM item", (err, data) => {
        if (err) {
          console.error(err);
        }
        res(data);
      });
    });
  };

  getItems().then((userList) => res.send(userList));
});

router.post("/update", (req, res) => {
  const updateItem = (id, name, storage, price, shopname) => {
    return new Promise((res) => {
      connection.query(
        "UPDATE item SET " +
          "name = ?, " +
          "storage = ?, " +
          "price = ?, " +
          "shopname = ? " +
          "WHERE id = ?",
        [name, storage, price, shopname, id],
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res(data);
        }
      );
    });
  };

  updateItem(
    req.body.id,
    req.body.name,
    req.body.storage,
    req.body.price,
    req.body.shopname
  ).then((data) => {
    res.send({ success: data.changedRows > 0 })
  });
});

router.post("/delete", (req, res) => {  
  const updateItem = (id) => {
    return new Promise((res) => {
      connection.query(`DELETE FROM item where id=${id}`,
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res(data);
        }
      );
    });
  };

  updateItem(req.body.id).then((data) => {
    res.send({ success: data.affectedRows > 0 })
  });
});

module.exports = router;
