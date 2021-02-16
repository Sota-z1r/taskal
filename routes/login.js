const express = require('express');
const mysql = require('mysql');
const { render } = require('../app');

const router = express.Router();

const connection = mysql.createConnection({
  host: 'us-cdbr-east-03.cleardb.com',
  port: 3306,
  user: 'b398803bdf1570',
  password: '8ae8b4f2',
  database: 'heroku_27791ce74a042e7'
});

router.get('/',(req, res, next) => {
  res.render('login', {title: 'ログイン'});
});

router.post('/', (req,res,next) => {
  const email = req.body.email;
  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, email, (error, results) => {
    if(results.length > 0){
      if(req.body.password === results[0].password){
        console.log('ログイン成功！');
        res.redirect('/index', {title: 'ログイン'});
      }else {
        console.log('ログイン失敗!');
        res.redirect('login', {title: 'ログイン'});
      }
    } else {
      console.log('入力しろ');
      res.redirect('login', {title: 'ログイン'});
    }
  });
});



module.exports = router;