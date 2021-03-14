const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { checkAuthenticated } = require("../config/auth");
const createConnection = require("./pool.js");

const router = express.Router();

router.get("/addTeam", checkAuthenticated, (req, res, next) => {
  res.render("addTeam", { teamNameErrors: [] });
});

router.post("/addTeam", async (req, res, next) => {
  const teamName = req.body.teamName;
  const userId = req.user.id;
  const now = new Date();
  const plain =
    teamName +
    now.getFullYear() +
    now.getMonth() +
    now.getDate() +
    now.getHours() +
    now.getMinutes();
  const hash = bcrypt.hashSync(plain, 5);
  const sql =
    "INSERT INTO teams(teamName, user_id, hashedTeamId) VALUES(?,?,?);";
  const connection = await createConnection();
  connection.connect();
  await connection.query(sql, [teamName, userId, hash], (error, results) => {
    res.redirect("teams");
  });
  connection.end();
});

module.exports = router;
