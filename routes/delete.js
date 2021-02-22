const express = require("express");
const router = express.Router();
const mysql = require("mysql");

function changeTodoState(sql, todoId) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: "b398803bdf1570",
      password: "8ae8b4f2",
      database: "heroku_27791ce74a042e7",
    });
    connection.connect();
    connection.query(sql, todoId, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.post("/delete/:todoid", async function (req, res, next) {
  const todoId = req.params.todoid;
  const sql = "UPDATE todos SET state = 0 WHERE todo_id = ?;";
  await changeTodoState(sql, todoId);
  res.redirect("/");
});

module.exports = router;
