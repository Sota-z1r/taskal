const express = require("express");
const router = express.Router();
const connection = require("./connection.js");

function insertTodo(sql, todo, state, date) {
  return new Promise((resolve) => {
    connection.query(sql, [todo, state, date], function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.post("/add", async function (req, res, next) {
  console.log(req.body);
  const todo = req.body.todo;
  const date = req.body.date;
  const sql = "INSERT INTO todos(todo, state, date) values(?, ?, ?);";
  await insertTodo(sql, todo, "1", date);
  res.redirect("/");
});

module.exports = router;
