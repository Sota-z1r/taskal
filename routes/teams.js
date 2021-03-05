const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");

const connection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7",
});

router.get("/teams", async (req, res, next) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  const connection = await createConnection();
  connection.query(sql, userId, (error, results) => {
    res.render("teams", { teams: results }); //チームがないときは？
  });
});

module.exports = router;
