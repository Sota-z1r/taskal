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

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, email, (error, results) => {
    if (results[0] != null) {
      if (bcrypt.compareSync(password, results[0].password)) {
        req.session.userId = results[0].id;
        req.session.username = results[0].username;
        res.redirect("/index");
      } else {
        //ログイン失敗
        res.redirect("/login");
      }
    } else {
      //無記入
      res.redirect("/login");
    }
  });
});

module.exports = router;
