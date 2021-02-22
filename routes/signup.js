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
  res.render("signup");
});



router.post("/signup", 
(req, res, next) => {
  const email = req.body.email;
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, email, (error, results) => {
    if (results.length > 0) { //email登録済みの処理
      res.redirect("/signup");
    } else {
      next();//次のミドルウェアに渡す役割 next();
    }
  });
},
(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashed_password = bcrypt.hashSync(password, 10);//passwordをハッシュ化
    const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
    connection.query(sql, [username, email, hashed_password], (error, results) => {
      req.session.userId = results.insertId; //INSERTクエリが成功すると、特に設定しなくても、追加したレコードのidがresultsオブジェクトのinsertIdというプロパティに入る
      req.session.username = username;
      res.redirect("/index");
    });
  }
);

module.exports = router;
