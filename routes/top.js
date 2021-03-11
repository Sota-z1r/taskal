const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { checkNotAuthenticated } = require("../config/auth");
const createConnection = require("./pool.js");

const router = express.Router();

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
    if (req.body.email.length <= 0 || req.body.password.length <= 0) {
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/top");
});

module.exports = router;
