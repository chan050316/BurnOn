const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/timer", (req, res) => {
  res.render("timer");
});

router.get("/pomodoro", (req, res) => {
  const cookie = JSON.stringify(req.cookies);
  if (cookie === "{}") {
    console.log("You come this page first time!");
    res.cookie("json", {
      visitRecord: "MoreFirstTime",
    });
    // 첫번째 일때
  } else {
    console.log("You come this page not first time!");
    // 첫번째 아닐 때
  }
  console.log(req.cookies);
  res.render("pomodoro");
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

module.exports = router;
