var express = require("express");
var router = express.Router();
const { checkAuthenticated } = require("../config/auth");
const createConnection = require("./pool.js");

router.get(
  "/getName/:hashId",
  checkAuthenticated,
  async function (req, res, next) {
    const id = req.user.id;
    const sql = "SELECT * FROM users WHERE id = ?;";
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, id, function (err, rows, fields) {
      res.json(rows);
    });
    connection.end();
  }
);

module.exports = router;
