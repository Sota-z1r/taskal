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

router.get("/addTeam", (req,res,next)=>{
  res.render("addTeam");
});

router.post("/addTeam", (req, res, next) => {
  const teamName = req.body.teamName;
  const userId = req.session.userId;
  const sql = "INSERT INTO teams(name, user_id) VALUES(?,?);";
  connection.query(sql, [teamName, userId], (error, results)=>{
    res.redirect("/teams");
  });
});



module.exports = router;