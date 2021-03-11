const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");
const { checkAuthenticated } = require("../config/auth");

router.get("/teamslist", checkAuthenticated, async (req, res, next) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  const connection = await createConnection();
  connection.connect();
  await connection.query(sql, userId, (error, results) => {
    res.json(results); //チームがないときは？
  });
  connection.end();
});

module.exports = router;
