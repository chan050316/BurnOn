const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("json", {
    visitRecord: "firstTime",
  });
  console.log(req.cookies);

  res.render("home");
});

router.get("/timer", (req, res) => {
  res.render("timer");
});

router.get("/pomodoro", (req, res) => {
  res.cookie("json", {
    visitRecord: "MoreFirstTime",
  });
  if (req.cookies.json.visitRecord === "firstTime") {
    console.log("HAHA");
  }
  console.log(req.cookies);
  res.render("pomodoro");
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

module.exports = router;
