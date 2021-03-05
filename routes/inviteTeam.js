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

router.get("/inviteTeam", (req, res, next) => {
  const url = req.body.url;

  const sql =
    "INSERT INTO teams(teamName, user_id, hashedTeamId) VALUES(?, ?, ?);";
});
module.exports = router;
