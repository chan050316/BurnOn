const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/timer", (req, res) => {
  const musicFolder = "./public/audios";
  fs.readdir(musicFolder, function (error, musicfilelist) {
    for (i in musicfilelist) {
      const fileName = musicfilelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      musicfilelist[i] = fileName.substr(0, mp3TextNum);
    }
    const alarmFolder = "./public/alarmSounds";
    fs.readdir(alarmFolder, function (error, alarmfilelist) {
      for (i in alarmfilelist) {
        const fileName = alarmfilelist[i];
        const mp3TextNum = fileName.indexOf(".mp3");
        alarmfilelist[i] = fileName.substr(0, mp3TextNum);
      }
      res.render("timer", {
        musicNames: musicfilelist,
        alarmNames: alarmfilelist,
      });
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
  const folder = "./public/audios";
  fs.readdir(folder, function (error, filelist) {
    for (i in filelist) {
      const fileName = filelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      filelist[i] = fileName.substr(0, mp3TextNum);
    }
    res.render("pomodoro", {
      fileNames: filelist,
    });
  });
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

module.exports = router;
