const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.session.destroy((error) =>{
    res.render("index");
  });
});

module.exports = router;
