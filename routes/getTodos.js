var express = require("express");
var router = express.Router();
const connection = require("./connection.js");

function getTodos(sql) {
  return new Promise((resolve) => {
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get("/gettodos", async function (req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state != "0";';
  const todos = await getTodos(sql);
  res.json(todos);
});

module.exports = router;
