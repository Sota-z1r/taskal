const express = require("express");
const router = express.Router();
const connection = require("./connection.js");

function changeTodoState(sql, todoId) {
  return new Promise((resolve) => {
    connection.query(sql, todoId, function (err, rows, fields) {
      resolve(rows);
    });
  });
}

router.post("/transDoing/:todoid", async function (req, res, next) {
  const todoId = req.params.todoid;
  const sql = "UPDATE todos SET state = 2 WHERE todo_id = ?;";
  await changeTodoState(sql, todoId);
  res.redirect("/Todoboard/" + req.session.hashedId);
});

module.exports = router;
