var express = require('express');
var router = express.Router();
var userList = require('./userList');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a register");
});

router.post("/info", (req, res) => {
  var exist = false, curUser;
  for (const item of userList) {
    if (req.body.email == item.email) {
      exist = true;
    }
  }

  if (!exist) {
    let lastid =
      parseInt(userList[userList.length - 1].id.split("U")[1]) + 1 + "";
    curUser = {
      id: "U" + lastid.padStart(3, "0"),
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      data: [],
    };

    userList.push(curUser);
  }

  res.send({ success: !exist, user: curUser });
});

module.exports = router;
