const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");

router.get("/teams", async (req, res, next) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  const connection = await createConnection();
  connection.query(sql, userId, (error, results) => {
    res.render("teams", {teams: results});//チームがないときは？
  });
});

module.exports = router;