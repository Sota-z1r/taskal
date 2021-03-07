"use strict";

const addTodos = function () {
  const hashId = location.pathname.substr(10);
  const addTodo = document.getElementById("inputTodo");
  const addform = document.createElement("form");
  addform.classname = "addform";
  addform.action = "/add" + hashId;
  addform.method = "POST";
  addTodo.appendChild(addform);
  const addinput = document.createElement("input");
  addinput.className = "addText";
  addinput.type = "text";
  addinput.name = "todo";
  addinput.placeholder = "input todo";
  const addBtn = document.createElement("button");
  addBtn.className = "addBtn";
  addBtn.type = "submit";
  addBtn.innerHTML = "add";
  const addDate = document.createElement("input");
  addDate.id = "date";
  addDate.type = "date";
  addDate.name = "date";
  addDate.value = "";
  addform.appendChild(addinput);
  addform.appendChild(addBtn);
  addform.appendChild(addDate);
};

const getTodos = function () {
  const request = new XMLHttpRequest();
  const requestURL = location.pathname.substr(10);
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const todos = request.response;
    const state_1 = [];
    const state_2 = [];
    const state_3 = [];

    todos.forEach((todo) => {
      if (todo.state == 1) state_1.push(todo);
      if (todo.state == 2) state_2.push(todo);
      if (todo.state == 3) state_3.push(todo);
    });

    printTodos(state_1);
    printDoings(state_2);
    printDones(state_3);
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
    // transformを作る
    const transform = document.createElement("form");
    transform.className = "transform";
    transform.action = "/transDoing/";
    transform.method = "POST";
    transform.id = "transForm_1to2" + todoId;
    li.appendChild(transform);
    // doingBtnをつくる
    const doingBtn = document.createElement("button");
    doingBtn.innerHTML = "doing";
    doingBtn.id = "doingBtn";
    doingBtn.setAttribute("onclick", `transDoing(${todoId})`);
    transform.appendChild(doingBtn);
    // deletformを作る
    const deleteform = document.createElement("form");
    deleteform.className = "deleteform";
    deleteform.action = "/delete/";
    deleteform.method = "POST";
    deleteform.id = "deleteForm" + todoId;
    li.appendChild(deleteform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${todoId})`);
    deleteform.appendChild(deleteBtn);
  });
};

const printDoings = function (doings) {
  const doingList = document.getElementById("doingList");
  doings.forEach((doing) => {
    const doingId = doing.todo_id;
    const doingText = doing.todo;
    // liを作る
    const li = document.createElement("li");
    li.className = "doing";
    doingList.appendChild(li);
    // doingの内容を入れるpタグを作る
    const p = document.createElement("p");
    p.innerHTML = doingText;
    p.className = "doingText";
    li.appendChild(p);
    // transformを作る
    const transform = document.createElement("form");
    transform.className = "transform";
    transform.action = "/transDone/";
    transform.method = "POST";
    transform.id = "transForm_2to3" + doingId;
    li.appendChild(transform);
    // deletformを作る
    const deleteform = document.createElement("form");
    deleteform.className = "deleteform";
    deleteform.action = "/delete/";
    deleteform.method = "POST";
    deleteform.id = "deleteForm" + doingId;
    li.appendChild(deleteform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${doingId})`);
    deleteform.appendChild(deleteBtn);
    // doneBtnをつくる
    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "done";
    doneBtn.id = "doneBtn";
    doneBtn.setAttribute("onclick", `transDone(${doingId})`);
    transform.appendChild(doneBtn);
  });
};

const printDones = function (dones) {
  const doneList = document.getElementById("doneList");
  dones.forEach((done) => {
    const doneId = done.todo_id;
    const doneText = done.todo;
    const doneDate = done.date;
    // liを作る
    const li = document.createElement("li");
    li.className = "done";
    doneList.appendChild(li);
    // doneの内容を入れるpタグを作る
    const p = document.createElement("p");
    p.innerHTML = doneText;
    p.className = "doneText";
    li.appendChild(p);
    // deletformを作る
    const deleteform = document.createElement("form");
    deleteform.className = "deleteform";
    deleteform.action = "/delete/";
    deleteform.method = "POST";
    deleteform.id = "deleteForm" + doneId;
    li.appendChild(deleteform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${doneId})`);
    deleteform.appendChild(deleteBtn);
    // 期限超過のタスクを消去
    const now = new Date();
    const month_1 = now.getMonth() + 1;
    const date_1 = now.getDate();
    const month_2 = [];
    const date_2 = [];
    if (month_1 < 10) month_2[0] = "0" + month_1;
    if (date_1 < 10) date_2[0] = "0" + date_1;
    const nowDate = now.getFullYear() + "-" + month_2 + "-" + date_2;
    window.alert(nowDate + " " + doneDate);
    if (nowDate > doneDate) deleteTodo(doneId);
  });
};

const addTodo = function (addTodo) {};

const deleteTodo = function (todoId) {
  const form = document.getElementById("deleteForm" + todoId);
  form.action = form.action + todoId;
  form.submit();
};

const transDoing = function (doingId) {
  const form = document.getElementById("transForm_1to2" + doingId);
  form.action = form.action + doingId;
  form.submit();
};

const transDone = function (doneId) {
  const form = document.getElementById("transForm_2to3" + doneId);
  form.action = form.action + doneId;
  form.submit();
};

addTodos();
getTodos();
