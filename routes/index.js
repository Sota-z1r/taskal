const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/auth");

/* GET home page. */
router.get("/Todoboard/:hashId", checkAuthenticated, function (req, res, next) {
  res.render("index", { title: "Taskal" });
});

module.exports = router;
