"use strict";

const limboard = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/limboard";
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const dislim = request.response;
    console.log(dislim);
    printLimboard(dislim);
  };
};

const printLimboard = function (dislim) {
  const limitList = document.getElementById("limit");
  dislim.forEach((item) => {
    const expired_date = item.date;
    console.log(typeof(item.date));
    const expiredText = item.todo;
    // liを作る
    const li = document.createElement("li");
    li.className = "limit";
    limitList.appendChild(li);
    // todoの内容を入れるpタグを作る
    const p = document.createElement("p");
    const q = document.createElement("p");
    p.innerHTML = expiredText;
    p.className = "expiredText";
    q.innerHTML = expired_date;
    q.className = "expired_date";
    li.appendChild(p);
    li.appendChild(q);
    
  });
};

limboard();