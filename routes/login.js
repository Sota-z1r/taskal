const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const connection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7",
});

router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, email, (error, results) => {
    if (results[0] != null) {
      if (req.body.password === results[0].password) {
        console.log("ログイン成功！");
        req.session.userId = results[0].id;
        req.session.email = results[0].email;
        res.locals.email = req.session.email;
        res.locals.isLoggedIn = true;
        res.render("index");
      } else {
        console.log("ログイン失敗!");
        res.redirect("/login");
      }
    } else {
      console.log("入力してください");
      res.redirect("/login");
    }
  });
});

module.exports = router;
