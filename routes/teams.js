const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/auth");

<<<<<<< HEAD
/* GET home page. */
router.get("/teams", checkAuthenticated, function (req, res, next) {
  res.render("teams", { title: "Taskal" });
=======
router.get("/teams", checkAuthenticated, async (req, res, next) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM teams WHERE user_id = ?";
  const connection = await createConnection();
  connection.connect();
  connection.query(sql, userId, (error, results) => {
    res.render("teams", { teams: results }); //チームがないときは？
  });
  connection.end();
>>>>>>> ef49cbffb87c10ac5de05806d2704a4a7b7db1e2
});

module.exports = router;
