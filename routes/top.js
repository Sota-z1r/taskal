const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { checkNotAuthenticated } = require("../config/auth");

const router = express.Router();

const pool = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  port: 3306,
  user: "b398803bdf1570",
  password: "8ae8b4f2",
  database: "heroku_27791ce74a042e7",
});

const createConnection = function () {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) reject(error);
      resolve(connection);
    });
  });
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      const sql = "SELECT * FROM users WHERE email = ?";
      const users = await checkUser(sql, email);
      for (i = 0; i < users.length; i++) {
        if (await bcrypt.compare(password, users[i].password)) {
          return done(null, { email, password, id: users[i].id });
        }
      }
      return done(null, false);
    }
  )
);

function insertUser(sql, username, hashedPassword) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(
      sql,
      [username, hashedPassword],
      function (err, rows, fields) {
        resolve(rows);
      }
    );
    connection.end();
  });
}

function checkUser(sql, email) {
  return new Promise(async (resolve) => {
    const connection = await createConnection();
    connection.connect();
    connection.query(sql, email, function (err, rows, fields) {
      resolve(rows);
    });
    connection.end();
  });
}

router.get("/top", (req, res, next) => {
  res.render("top", { mailErrors: [], passErrors: [] });
});

router.post(
  "/top",
  checkNotAuthenticated,
  function (req, res, next) {
    console.log("現在top");
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
      console.log("/topへ");
      return res.redirect("/top");
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/teams",
    failureRedirect: "/top",
    failureFlash: true,
  })
);

module.exports = router;
