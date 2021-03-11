"use strict";

const header = function () {
  const acct = document.getElementById("acct");
  const user = document.createElement("p");
  user.innerHTML = "user_name";
  user.className = "user_name";
  user.id = "user_name";
  const logout = document.createElement("a");
  logout.innerHTML = "ログアウト";
  logout.class = "logout";
  logout.href = "/logout";
  acct.appendChild(user);
  acct.appendChild(logout);
};

header();
