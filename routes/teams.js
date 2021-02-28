const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const connection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7"
});

router.get("/teams", (req, res, next) => {
  const userId = req.session.userId;
  console.log("teams "+userId);
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  connection.query(sql, userId, (error, results) => {
    console.log(results);
    res.render("teams", {teams: results});
  });
});

module.exports = router;