const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");
const { checkAuthenticated } = require("../config/auth");

router.get("/teams", checkAuthenticated, async (req, res, next) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  const connection = await createConnection();
  connection.connect();
  connection.query(sql, userId, (error, results) => {
    res.render("teams", { teams: results }); //チームがないときは？
  });
  connection.end();
});

module.exports = router;
