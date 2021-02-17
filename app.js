var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");

var indexRouter = require("./routes");
var usersRouter = require("./routes/users");
const getTodosRoutor = require("./routes/getTodos");
const addRoutor = require("./routes/add");
const deleteRoutor = require("./routes/delete");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const topRouter = require("./routes/top");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret", //secret属性は指定した文字列を使ってクッキーIDを暗号化しクッキーIDが書き換えらているかを判断する。
    resave: false, //resaveはセッションにアクセスすると上書きされるオプションらしい。今回はfalse.
    saveUninitialized: false, //saveUninitializedは未初期化状態のセッションも保存するようなオプション。今回はfalse.
    cookie: {
      httpOnly: true, //クライアント側でクッキー値を見れない、書きかえれないようにするオプション
      secure: true, //https通信
      maxage: 1000 * 60 * 30, //セッションの消滅時間
    },
  })
  );
  app.use((req,res,next) => {
    if(req.session.userId === undefined){
      res.locals.email = "Guest";
      res.locals.isLoggedIn = false;
    }
    else {
      res.locals.email = req.session.email;
      res.locals.isLoggedIn = true; 
    }
    next();
  });
  
app.use("/top",topRouter);
app.use("/index", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/users", usersRouter);

app.get("/gettodos", getTodosRoutor);
app.post("/add", addRoutor);
app.post("/delete/:todoid", deleteRoutor);

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
