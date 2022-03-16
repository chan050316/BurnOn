const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/timer", (req, res) => {
  res.render("timer");
});

router.get("/pomodoro", (req, res) => {
  res.render("pomodoro");
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

module.exports = router;
