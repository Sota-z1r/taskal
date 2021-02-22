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
  res.render("top");
});

router.post("/top", (req, res, next) => {
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
