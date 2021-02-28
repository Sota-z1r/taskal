var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var moment = require("moment");

function board(sql) {
  return new Promise((resolve) => {
    const connection = mysql.createConnection({
      host: "us-cdbr-east-03.cleardb.com",
      port: 3306,
      user: 'b398803bdf1570',
      password: '8ae8b4f2',
      database: 'heroku_27791ce74a042e7',
      dateStrings: 'date'
    });
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.get("/board", async function (req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state != "0";';
  const todos = await board(sql);
  let now = new moment().format("YYYY-MM-DD");
  console.log(now);
  let dis = [];
  todos.forEach(function(item){
    console.log(item.date);
    let date = item.date;
    console.log(typeof(now));
    console.log(typeof(date));
    let today = Date.parse(now);
    let tasklim = Date.parse(date);
    const limit = (tasklim - today)/86400000;
    console.log(limit);
    if(limit <= 7){
      dis.push(item);
    }
  })
  console.log(dis);
  res.json(dis);
});

module.exports = router;
