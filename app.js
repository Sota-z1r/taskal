var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const getTodosRoutor = require("./routes/getTodos");
const addRoutor = require("./routes/add");
const deleteRoutor = require("./routes/delete");
const transDoingRoutor = require("./routes/transDoing");
const transDoneRoutor = require("./routes/transDone");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/top");
const topRouter = require("./routes/top");
const signupRouter = require("./routes/signup");
const boardRoutor = require("./routes/board");
const limboardRouter = require("./routes/limboard");
const teamsRouter = require("./routes/teams");
const addTeamRouter = require("./routes/addTeam");
const inviteTeamRouter = require("./routes/inviteTeam");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      _expires: 1000 * 60 * 5,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// // session
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use("/users", usersRouter);

app.get("/Todoboard/:hashId", indexRouter);
app.get("/top", topRouter);
app.post("/top", topRouter);
app.get("/signup", signupRouter);
app.post("/signup", signupRouter);
app.get("/login", loginRouter);
app.post("/login", loginRouter);
app.get("/logout", logoutRouter);
app.post("/logout", logoutRouter);
app.get("/teams", teamsRouter);
app.get("/addTeam", addTeamRouter);
app.post("/addTeam", addTeamRouter);
app.get("/inviteTeam", inviteTeamRouter);
app.post("/inviteTeam", inviteTeamRouter);

app.get("/:hashId", getTodosRoutor);
app.post("/add/:hashId", addRoutor);
app.post("/delete/:hashId/:todoid", deleteRoutor);
app.post("/transDoing/:hashId/:todoid", transDoingRoutor);
app.post("/transDone/:hashId/:todoid", transDoneRoutor);
app.get("/board/:hashId", boardRoutor);
app.get("/limboard/:hashId", limboardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
