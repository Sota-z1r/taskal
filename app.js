var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const getTodosRoutor = require("./routes/getTodos");
const addRoutor = require("./routes/add");
const deleteRoutor = require("./routes/delete");
const transDoingRoutor = require("./routes/transDoing");
const transDoneRoutor = require("./routes/transDone");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const topRouter = require("./routes/top");
const signupRouter = require("./routes/signup");
const boardRoutor = require("./routes/board");
const teamsRouter = require("./routes/teams");
const addTeamRouter = require("./routes/addTeam");

var app = express();

app.use(
  session({
    secret: "secret", //secret属性は指定した文字列を使ってクッキーIDを暗号化しクッキーIDが書き換えらているかを判断する。
    resave: false, //resaveはセッションにアクセスすると上書きされるオプションらしい。今回はfalse.
    saveUninitialized: false, //saveUninitializedは未初期化状態のセッションも保存するようなオプション。今回はfalse.
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = "Guest";
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

app.use("/users", usersRouter);

//app.get("/Todoboard/:hashId", indexRouter);
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

// app.get("/:hashId", getTodosRoutor);
app.get("/:hashId", getTodosRoutor);
app.post("/add", addRoutor);
app.post("/delete/:todoid", deleteRoutor);
app.post("/transDoing/:todoid", transDoingRoutor);
app.post("/transDone/:todoid", transDoneRoutor);
app.post("/delete/:todoid", deleteRoutor);
app.get("/board", boardRoutor);

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
