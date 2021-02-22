const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

const connection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7",
});

router.get("/top", (req, res, next) => {
  res.render("top", {errors: []});
});

router.post("/top", 
(req, res, next) => {
  let errors = [];
  const email = req.body.email;
  const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if(email === ""){
    errors.push("Eメールを入力してください。");
  } 
  if(reg.test(email) === false && email != "") {
    errors.push("有効なメールアドレスを入力してください。");
  }
  if(errors.length > 0){
    res.render("top", {errors: errors});
  } else {
    next();
  }
},
(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, email, (error, results) => {
      if (results[0] != null) {
        if (bcrypt.hashSync(password, results[0].password)) {//暗号化されたものと比較し、trueなら一致
          req.session.userId = results[0].id;
          req.session.username = results[0].username;
          console.log("成功");
          res.redirect("/index");
        } else {
          //ログイン失敗
          console.log("失敗");
          res.redirect("/top");
        }
      } else {
        //無記入
        console.log("無記入");
        res.redirect("/top");
      }
    });
  }
);

module.exports = router;
