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
  res.render("top", { mailErrors: [], passErrors: [] });
});

router.post(
  "/top",
  (req, res, next) => {
    let mailErrors = [];
    let passErrors = [];
    const email = req.body.email;
    const password = req.body.password;
    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (email === "") {
      mailErrors.push("Eメールを入力してください。");
    }
    if (password === "") {
      passErrors.push("パスワードを入力してください。");
    }
    if (reg.test(email) === false && email != "") {
      mailErrors.push("有効なメールアドレスを入力してください。");
    }
    if (mailErrors.length > 0 || passErrors.length > 0) {
      //エラーがあったとき
      res.render("top", { mailErrors: mailErrors, passErrors: passErrors });
    } else {
      next();
    }
  },
  (req, res, next) => {
    let mailErrors = [];
    let passErrors = [];
    const email = req.body.email;
    const password = req.body.password;
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, email, (error, results) => {
      if (results[0] != null) {
        if (bcrypt.compareSync(password, results[0].password)) {
          //ログイン成功
          req.session.userId = results[0].id;
          req.session.username = results[0].username;
          console.log("成功");
          res.redirect("/index");
        } else {
          //パスワードが違う
          passErrors.push("パスワードが違います。");
          res.render("top", { mailErrors: [], passErrors: passErrors});
        }
      } else {
        if(email != ""){
          //Eメールが見つからないとき
          mailErrors.push("Eメールが見つかりません。");
          res.render("top", { mailErrors: mailErrors, passErrors: []});
        } else {
          //無記入
          mailErrors.push("Eメールを入力してください。");
          passErrors.push("パスワードを入力してください。");
          res.render("top", { mailErrors: mailErrors, passErrors: passErrors });
        }
      }
    });
  }
);

module.exports = router;
