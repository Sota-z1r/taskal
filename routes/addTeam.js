const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

const connection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7"
});


router.get("/addTeam", (req,res,next)=>{
  res.render("addTeam", {teamNameErrors: []});
});

router.post("/addTeam", (req, res, next) => {
  const teamName = req.body.teamName;
  const userId = req.session.userId;
  const now = new Date();
  const plain = teamName + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes();
  const hash  = bcrypt.hashSync(plain, 5);
  console.log("addTeam "+hash);
  const sql = "INSERT INTO teams(teamName, user_id, hashedTeamId) VALUES(?,?,?);";
  connection.query(sql, [teamName, userId, hash], (error, results)=>{
    res.redirect("teams");
  });
});

module.exports = router;