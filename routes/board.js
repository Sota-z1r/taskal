var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var moment = require("moment");
const connection = require("./connection.js");

function board(sql) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: "b398803bdf1570",
      password: "8ae8b4f2",
      database: "heroku_27791ce74a042e7",
      dateStrings: "date",
    });
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get("/board/:hashId", async function (req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state != "0";';
  const todos = await board(sql);
  let now = new moment().format("YYYY-MM-DD");
  let dis = [];
  todos.forEach(function (item) {
    let date = item.date;
    let today = Date.parse(now);
    let tasklim = Date.parse(date);
    const limit = (tasklim - today) / 86400000;
    if (limit <= 7 && limit > 0) {
      dis.push(item);
    }
  });
  res.json(dis);
});

module.exports = router;
