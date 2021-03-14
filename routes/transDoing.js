const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");

function changeTodoState(sql, todoId) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, todoId, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.post("/transDoing/:hashId/:todoid", async function (req, res, next) {
  const todoId = req.params.todoid;
  const hashId = req.params.hashId;
  const sql = "UPDATE todos SET state = 2 WHERE todo_id = ?;";
  await changeTodoState(sql, todoId);
  res.redirect("/Todoboard/" + hashId);
});

module.exports = router;
