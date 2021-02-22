var express = require('express');
var router = express.Router();
const mysql = require('mysql');

function getTodos(sql) {
  return new Promise(resolve => { 
    const connection = mysql.createConnection({
      host: 'us-cdbr-east-03.cleardb.com',
      port: 3306,
      user: 'b398803bdf1570',
      password: '8ae8b4f2',
      database: 'heroku_27791ce74a042e7'
    });
    connection.connect();
    connection.query(sql, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
};

router.get('/gettodos', async function(req, res, next) {
  const sql = 'SELECT * FROM todos WHERE state = "1";';
  const todos = await getTodos(sql);
  res.json(todos);
});

module.exports = router;