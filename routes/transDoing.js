const express = require("express");
const router = express.Router();
const createConnection = require("./pool.js");

function changeTodoState(sql, todoId) {
  return new Promise(async (resolve) => {
    const connectio = await createConnection();
    connectio.connect();
    connection.query(sql, todoId, function (err, rows, fields) {
      resolve(rows);
    });
    connectio.end();
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
