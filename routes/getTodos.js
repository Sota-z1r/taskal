var express = require("express");
var router = express.Router();
const connection = require("./connection.js");

function getTodos(sql, hashedId) {
  return new Promise((resolve) => {
    connection.query(sql, hashedId, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get("/:hashId", async function (req, res, next) {
  const hashedId = req.params.hashId;
  const sql = "SELECT * FROM todos WHERE state != 0 && team_id = ?;";
  const todos = await getTodos(sql, hashedId);
  req.session.hashedId = hashedId;
  res.json(todos);
});

module.exports = router;
