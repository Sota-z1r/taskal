"use strict";

const reqName = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/getName/" + location.pathname.substr(11);
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const name = request.response;
    header(name);
  };
};

const header = function (name) {
  const acct = document.getElementById("acct");
  const user = document.createElement("p");
  user.innerHTML = name[0].username + " さん";
  user.className = "user_name";
  user.id = "user_name";
  const logout = document.createElement("a");
  logout.innerHTML = "ログアウト";
  logout.class = "logout";
  logout.href = "/logout";
  acct.appendChild(user);
  acct.appendChild(logout);
};

const genelateURL = function () {
  const URL = document.getElementById("URL");
  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = "招待URLの発行";
  copyBtn.id = "copyURL";
  copyBtn.setAttribute("onclick", `copy()`);
  URL.appendChild(copyBtn);
};

const copy = async function () {
  const URLpath = location.pathname.substr(11);
  await navigator.clipboard.writeText(URLpath);
  alert("URLをクリップボードにコピーしました");
};

reqName();
genelateURL();
