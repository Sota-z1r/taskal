var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var moment = require("moment");
const connection = require("./connection.js");

function limboard(sql, hashId) {
  return new Promise((resolve) => {
    connection.query(sql, hashId, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get("/limboard/:hashId", async function (req, res, next) {
  const sql = "SELECT * FROM todos WHERE state != 0 AND team_id = ?;";
  const hashId = req.params.hashId;
  const todos = await limboard(sql, hashId);
  let now = new moment().format("YYYY-MM-DD");
  let dislim = [];
  todos.forEach(function (item) {
    let date = item.date;
    let today = Date.parse(now);
    let tasklim = Date.parse(date);
    const limit = (tasklim - today) / 86400000;
    if (limit <= 0) {
      dislim.push(item);
    }
  });
  res.json(dislim);
});

module.exports = router;
