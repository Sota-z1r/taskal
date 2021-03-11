var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var moment = require("moment");
const { checkAuthenticated } = require("../config/auth");
const createConnection = require("./pool");

function board(sql, hashId) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, hashId, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.get(
  "/board/:hashId",
  checkAuthenticated,
  async function (req, res, next) {
    const sql = "SELECT * FROM todos WHERE state != 0 AND team_id = ?;";
    const hashId = req.params.hashId;
    const todos = await board(sql, hashId);
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
  }
);

module.exports = router;
