const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/Todoboard/:hashId", function (req, res, next) {
  console.log("index ");
  res.render("index", { title: "Taskal" });
});

module.exports = router;
