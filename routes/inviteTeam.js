const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const createConnection = require("./pool.js");

router.post("/inviteTeam", async function (req, res, next) {
  const connection = await createConnection();
  const hashedTeamId = req.body.url;
  const user_id = req.user.id;
  const teamName = [];
  const sql_1 = "SELECT * FROM teams";
  const sql_2 =
    "INSERT INTO teams(teamName, user_id, hashedTeamId) VALUES(?,?,?);";
  const Team = await checkUser(sql_1);
  for (i = 0; i < Team.length; i++) {
    if (await (hashedTeamId == Team[i].hashedTeamId))
      teamName[0] = Team[i].teamName;
  }
  console.log(teamName[0], user_id, hashedTeamId);
  connection.query(
    sql_2,
    [teamName[0], user_id, hashedTeamId],
    (error, results) => {
      res.redirect("teams");
    }
  );
  connection.end();
});

function checkUser(sql) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

module.exports = router;
