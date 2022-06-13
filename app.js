const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", indexRouter);
app.use(methodOverride("_method"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(PORT + "에서 대기중");
});
