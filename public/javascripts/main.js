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
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteBtn.className = "deleteBtn";
    deleteBtn.setAttribute("onclick", `deleteTodo(${todoId})`);
    li.appendChild(deleteBtn);
  });
};

const deleteTodo = function (todoId) {
  const form = document.getElementById("deleteForm");
  form.action = form.action + todoId;
  form.submit();
};

getTodos();
