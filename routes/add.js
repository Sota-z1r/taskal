const express = require("express");
const router = express.Router();
const connection = require("./connection.js");

function insertTodo(sql, todo, state, date, hashedId) {
  return new Promise((resolve) => {
    connection.query(
      sql,
      [todo, state, date, hashedId],
      function (err, rows, fields) {
        resolve(rows);
      }
    );
  });
}

router.post("/add/:hashId", async function (req, res, next) {
  const todo = req.body.todo;
  const date = req.body.date;
  console.log(todo);
  console.log(date);
  const sql =
    "INSERT INTO todos(todo, state, date, team_id) values(?, ?, ?, ?);";
  await insertTodo(sql, todo, "1", date, req.params.hashId);
  res.redirect("/Todoboard/" + req.params.hashId);
});

module.exports = router;
