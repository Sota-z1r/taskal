"use strict";

const getTodos = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/gettodos";
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const todos = request.response;
    printTodos(todos);
  };
};

const printTodos = function (todos) {
  const todoList = document.getElementById("todoList");
  todos.forEach((todo) => {
    const todoId = todo.todo_id;
    const todoText = todo.todo;
    // liを作る
    const li = document.createElement("li");
    li.className = "todo";
    todoList.appendChild(li);
    // todoの内容を入れるpタグを作る
    const p = document.createElement("p");
    p.innerHTML = todoText;
    p.className = "todoText";
    li.appendChild(p);
    // deletformを作る
    const deleteform = document.createElement("form");
    deleteform.className = "deleteBtn";
    deleteform.action = "/delete/";
    deleteform.method = "POST";
    deleteform.id = "deleteForm";
    li.appendChild(deleteform);
    // transformを作る
    const transform = document.createElement("form");
    transform.className = "transBtn";
    transform.action = "/transDoing/";
    transform.method = "POST";
    transform.id = "transForm";
    li.appendChild(transform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.className = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${todoId})`);
    deleteform.appendChild(deleteBtn);
    // doingBtnをつくる
    const doingBtn = document.createElement("button");
    doingBtn.innerHTML = "doing";
    doingBtn.id = "doingBtn";
    doingBtn.className = "doingBtn";
    doingBtn.setAttribute("onclick", `transDoing(${todoId})`);
    transform.appendChild(doingBtn);
  });
};

const printDoings = function (doings) {
  const doingList = document.getElementById("doingList");
  doings.forEach((doing) => {
    const doingId = doing.doing_id;
    const doingText = doing.doing;
    // liを作る
    const li = document.createElement("li");
    li.className = "doing";
    doingList.appendChild(li);
    // doingの内容を入れるpタグを作る
    const p = document.createElement("p");
    p.innerHTML = doingText;
    p.className = "doingText";
    li.appendChild(p);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.className = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${doingId})`);
    li.appendChild(deleteBtn);
  });
};

const printDone = function (doings) {
  const doingList = document.getElementById("doneList");
  doings.forEach((doing) => {
    const doingId = doing.doing_id;
    const doingText = doing.doing;
    // liを作る
    const li = document.createElement("li");
    li.className = "doing";
    doingList.appendChild(li);
    // doingの内容を入れるpタグを作る
    const p = document.createElement("p");
    p.innerHTML = doingText;
    p.className = "doingText";
    li.appendChild(p);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.className = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${doingId})`);
    li.appendChild(deleteBtn);
  });
};

const deleteTodo = function (todoId) {
  const form = document.getElementById("deleteForm");
  form.action = form.action + todoId;
  form.submit();
};

const transDoing = function (todoID) {
  const form = document.getElementById("transForm");
  form.action = form.action + todoId;
  form.submit();
};

getTodos();
