"use strict";

const getTeams = function () {
  const request = new XMLHttpRequest();
  const requestURL = "/teamslist";
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const teams = request.response;
    printTeams(teams);
  };
};

const printTeams = function (teams) {
  const teamList = document.getElementById("printTeams");
  teams.forEach((team) => {
    const teamId = team.team_id;
    const teamName = team.teamName;
    const hashId = team.hashedTeamId;
    const li = document.createElement("li");
    li.className = "team";
    teamList.appendChild(li);
    const a = document.createElement("a");
    a.className = "teamText";
    a.innerHTML = teamName;
    a.href = "/Todoboard/" + hashId;
    li.appendChild(a);
    const deleteform = document.createElement("form");
    deleteform.className = "deleteform";
    deleteform.action = "/deleteTeam/" + teamId;
    deleteform.method = "POST";
    deleteform.id = "delTeamForm" + teamId;
    li.appendChild(deleteform);
    // deleteBtnを作る
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.id = "deleteBtn";
    deleteform.appendChild(deleteBtn);
  });
};

getTeams();
