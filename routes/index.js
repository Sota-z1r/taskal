const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/Todoboard/:hashId", function (req, res, next) {
  res.render("index", { title: "Taskal" });
});

module.exports = router;
