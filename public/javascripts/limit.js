"use strict";

const board = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/board/" + location.pathname.substr(11);
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const dis = request.response;
    printLimit(dis);
  };
};

const printLimit = function (dis) {
  const limitList = document.getElementById("limit");
  dis.forEach((item) => {
    const todo_date = item.date;
    const limitText = item.todo;
    // liを作る
    const li = document.createElement("li");
    li.className = "limit";
    limitList.appendChild(li);
    // todoの内容を入れるpタグを作る
    const p = document.createElement("p");
    const q = document.createElement("p");
    p.innerHTML = limitText;
    p.className = "limitText";
    q.innerHTML = todo_date;
    q.className = "todo_date";
    li.appendChild(p);
    li.appendChild(q);
  });
};

board();
