const express = require("express");
const router = express.Router();
const mysql = require("mysql");

function insertTodo(sql, todo, state) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: "b3fb5ff6f2f761",
      password: "fa2c0c58",
      database: "heroku_82cf2653734cd1a",
    });
    connection.connect();
    connection.query(sql, [todo, state], function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.post("/add", async function (req, res, next) {
  const todo = req.body.todo;
  const sql = "INSERT INTO todos(todo, state) values(?, ?);";
  await insertTodo(sql, todo, "1");
  res.redirect("/");
});

module.exports = router;
