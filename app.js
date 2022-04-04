const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const PORTNUM = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", indexRouter);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.listen(PORTNUM, () => {
  console.log(PORTNUM + "에서 대기중");
});
