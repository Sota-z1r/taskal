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

router.get("/signup", (req, res, next) => {
  let errors = [];
  res.render("signup", { usernameErrors: [], mailErrors: [], passErrors: [] });
});

router.post(
  "/signup",
  (req, res, next) => {
    let usernameErrors = [];
    let mailErrors = [];
    let passErrors = [];
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username === "") {
      usernameErrors.push("ユーザーネームを入力してください。");
    }
    if (email === "") {
      mailErrors.push("Eメールを入力してください。");
    }
    if (password === "") {
      passErrors.push("パスワードを入力してください。");
    }
    if (
      usernameErrors.length > 0 ||
      mailErrors.length > 0 ||
      passErrors.length > 0
    ) {
      res.render("signup", {
        usernameErrors: usernameErrors,
        mailErrors: mailErrors,
        passErrors: passErrors,
      });
    } else {
      next();
    }
  },
  (req, res, next) => {
    let mailErrors = [];
    let reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/; //正規表現
    const email = req.body.email;
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.query(sql, email, (error, results) => {
      if (reg.test(email) === false) {
        //有効なメールか確認
        mailErrors.push("有効なメールアドレスを入力してください。");
      } else if (results[0] != null) {
        //email登録済みの処理
        mailErrors.push("入力されたメールアドレスは登録済みです。");
      }
      if (mailErrors.length > 0) {
        //エラーがあったら
        res.render("signup", {
          usernameErrors: [],
          mailErrors: mailErrors,
          passErrors: [],
        });
      } else {
        next(); //次のミドルウェアに渡す役割 next();
      }
    });
  },
  (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashed_password = bcrypt.hashSync(password, 10); //passwordを暗号化
    const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
    connection.query(
      sql,
      [username, email, hashed_password],
      (error, results) => {
        req.session.userId = results.insertId; //INSERTクエリが成功すると、特に設定しなくても、追加したレコードのidがresultsオブジェクトのinsertIdというプロパティに入る
        req.session.username = username;
        res.redirect("/");
      }
    );
  }
);

module.exports = router;
