var express = require("express");
var router = express.Router();
const createConnection = require("./pool.js");
const { checkAuthenticated } = require("../config/auth");

function getTodos(sql, hashedId) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, hashedId, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.get("/:hashId", checkAuthenticated, async function (req, res, next) {
  const hashedId = req.params.hashId;
  const sql = "SELECT * FROM todos WHERE state != 0 && team_id = ?;";
  const todos = await getTodos(sql, hashedId);
  req.session.hashedId = hashedId;
  res.json(todos);
});

module.exports = router;
