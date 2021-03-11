const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/auth");

/* GET home page. */
router.get("/teams", checkAuthenticated, function (req, res, next) {
  res.render("teams", { title: "Taskal" });
});

module.exports = router;
