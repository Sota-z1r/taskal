var express = require("express");
var router = express.Router();
const mysql = require("mysql");

function getTodos(sql) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: "b3fb5ff6f2f761",
      password: "fa2c0c58",
      database: "heroku_82cf2653734cd1a",
    });
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.get("/gettodos", async function (req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state = "1";';
  const todos = await getTodos(sql);
  res.json(todos);
});

module.exports = router;
