const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORTNUM = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORTNUM, () => {
  console.log(PORTNUM + "에서 대기중");
});
