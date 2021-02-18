const express = require("express");
const router = express.Router();

router.get("/logout", (req, res, next) => {
  req.session.destroy((error) =>{
    res.redirect("index");
  });
});

module.exports = router;
