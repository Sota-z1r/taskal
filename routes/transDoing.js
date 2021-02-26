const express = require("express");
const router = express.Router();
const mysql = require("mysql");

function changeTodoState(sql, todoId) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: "b3fb5ff6f2f761",
      password: "fa2c0c58",
      database: "heroku_82cf2653734cd1a",
    });
    connection.connect();
    connection.query(sql, todoId, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.post("/transDoing/:todoid", async function (req, res, next) {
  const todoId = req.params.todoid;
  const sql = "UPDATE todos SET state = 2 WHERE todo_id = ?;";
  await changeTodoState(sql, todoId);
  res.redirect("/");
});

module.exports = router;
