const { resolveInclude } = require("ejs");
const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");

router.post("/deleteTeam/:teamId", async function (req, res, next) {
  const teamId = req.params.teamId;
  const userId = req.user.id;
  const sql = "DELETE FROM teams WHERE team_id = ? && user_id = ?";
  const connection = await createConnection();
  connection.connect();
  connection.query(sql, [teamId, userId]);
  connection.end;
  res.redirect("/teams");
});

module.exports = router;
