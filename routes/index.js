const express = require("express");
const router = express.Router();
const fs = require("fs");

function sendAudiosName() {}

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/timer", (req, res) => {
  sendAudiosName();
  const folder = "./public/audios";

  fs.readdir(folder, function (error, filelist) {
    for (i in filelist) {
      const fileName = filelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      filelist[i] = fileName.substr(0, mp3TextNum);
    }
    res.render("timer", {
      fileNames: filelist,
    });
  });
});

router.get("/pomodoro", (req, res) => {
  const cookie = JSON.stringify(req.cookies);
  if (cookie === "{}") {
    console.log("You come this page first time!");
    res.cookie(
      "json",
      {
        visitRecord: "FirstTime",
      },
      { path: "/pomodoro" }
    );
  } else {
    res.cookie(
      "json",
      {
        visitRecord: "moreFirstTime",
      },
      { path: "/pomodoro" }
    );
    console.log("You come this page not first time!");
  }
  res.render("pomodoro");
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

module.exports = router;
