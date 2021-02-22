"use strict";

const getTodos = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/gettodos";
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const todos = request.response;
    const state_1 = [];
    const state_2 = [];
    const state_3 = [];
    todos.forEach((todos) => {
      if (todos.state == 1) state_1.push(todos);
      if (todos.state == 2) state_2.push(todos);
      if (todos.state == 3) state_3.push(todos);
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
    transform.id = "transForm_1to2";
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
    deleteform.id = "deleteForm";
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
    transform.id = "transForm_2to3";
    li.appendChild(transform);
    // deletformを作る
    const deleteform = document.createElement("form");
    deleteform.className = "deleteform";
    deleteform.action = "/delete/";
    deleteform.method = "POST";
    deleteform.id = "deleteForm";
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
    deleteform.id = "deleteForm";
    li.appendChild(deleteform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${doneId})`);
    deleteform.appendChild(deleteBtn);
  });
};

const deleteTodo = function (todoId) {
  const form = document.getElementById("deleteForm");
  form.action = form.action + todoId;
  form.submit();
};

const transDoing = function (todoId) {
  const form = document.getElementById("transForm_1to2");
  form.action = form.action + todoId;
  form.submit();
};

const transDone = function (todoId) {
  const form = document.getElementById("transForm_2to3");
  form.action = form.action + todoId;
  form.submit();
};

getTodos();
