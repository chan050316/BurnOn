const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", indexRouter);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.listen(PORT, () => {
  console.log(PORT + "에서 대기중");
});
