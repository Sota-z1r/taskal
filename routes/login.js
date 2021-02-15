const express = require('express');
const router = express.Router();

router.get('/login', (req,res,next) => {
  res.render('/views/login.ejs', {title: 'ログイン'});
});

module.exports = router;