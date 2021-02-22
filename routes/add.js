const express = require('express');
const router = express.Router();
const mysql = require('mysql');

function insertTodo(sql, todo, state, date) {
  return new Promise(resolve => { 
    const connection = mysql.createConnection({
      host: 'us-cdbr-east-03.cleardb.com',
      port: 3306,
      user: 'b398803bdf1570',
      password: '8ae8b4f2',
      database: 'heroku_27791ce74a042e7'
    });
    connection.connect();
    connection.query(sql, [todo, state, date], function(err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
};

router.post('/add', async function (req, res, next) {
  console.log(req.body);
  const todo = req.body.todo;
  const date = req.body.date;
  const sql = 'INSERT INTO todos(todo, state, date) values(?, ?, ?);';
  await insertTodo(sql, todo, '1', date);
  res.redirect('/');
});

module.exports = router;