var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var moment = require("moment");
const connection = require("./connection.js");

function limboard(sql) {
  return new Promise((resolve) => {
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get("/limboard", async function (req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state != "0";';
  const todos = await limboard(sql);
  let now = new moment().format("YYYY-MM-DD");
  console.log(now);
  let dislim = [];
  todos.forEach(function(item){
    console.log(item.date);
    let date = item.date;
    console.log(typeof(now));
    console.log(typeof(date));
    let today = Date.parse(now);
    let tasklim = Date.parse(date);
    const limit = (tasklim - today)/86400000;
    console.log(limit);
    if(limit <= 0){
      dislim.push(item);
    }
  })
  console.log(dislim);
  res.json(dislim);
});

module.exports = router;
