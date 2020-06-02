var express = require('express');
var router = express.Router();
var userList = require('./userList');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user');
});

router.get("/info", (req, res) => {
  console.log("user-info GET 请求");
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

module.exports = router;
 