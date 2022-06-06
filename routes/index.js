const express = require("express");
const router = express.Router();
const fs = require("fs");
const models = require("../models");

const musicFolder = "./public/audios";
const alarmFolder = "./public/alarmSounds";
let quotes;
let randumQuote;
const getQuoteData = async () => {
  quotes = await models.Quote.findAll();
  const RandumNum = Math.floor(Math.random() * quotes.length);
  randumQuote = quotes[RandumNum];
};

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/timer", async (req, res) => {
  await getQuoteData();

  fs.readdir(musicFolder, function (error, musicfilelist) {
    for (i in musicfilelist) {
      const fileName = musicfilelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      musicfilelist[i] = fileName.substr(0, mp3TextNum);
    }
    fs.readdir(alarmFolder, function (error, alarmfilelist) {
      for (i in alarmfilelist) {
        const fileName = alarmfilelist[i];
        const mp3TextNum = fileName.indexOf(".mp3");
        alarmfilelist[i] = fileName.substr(0, mp3TextNum);
      }
      res.render("timer", {
        musicNames: musicfilelist,
        alarmNames: alarmfilelist,
        quoteData: randumQuote,
      });
    });
  });
});

router.get("/pomodoro", async (req, res) => {
  await getQuoteData();

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
  fs.readdir(musicFolder, function (error, musicfilelist) {
    for (i in musicfilelist) {
      const fileName = musicfilelist[i];
      const mp3TextNum = fileName.indexOf(".mp3");
      musicfilelist[i] = fileName.substr(0, mp3TextNum);
    }
    fs.readdir(alarmFolder, function (error, alarmfilelist) {
      for (i in alarmfilelist) {
        const fileName = alarmfilelist[i];
        const mp3TextNum = fileName.indexOf(".mp3");
        alarmfilelist[i] = fileName.substr(0, mp3TextNum);
      }
      res.render("pomodoro", {
        musicNames: musicfilelist,
        alarmNames: alarmfilelist,
        quoteData: randumQuote,
      });
    });
  });
});

router.get("/custom", (req, res) => {
  res.render("custom");
});

router.get("/settingQuote", async (req, res) => {
  await getQuoteData();
  // console.log(quotes);

  res.render("settingQuote", { quoteData: quotes });
});

router.post("/settingQuote/addQuote", (req, res) => {
  // method PUT used method-override
  models.Quote.create({
    quote_text: req.body.quote,
    quote_author: req.body.author,
  })
    .then(result => {
      console.log(result);
      res.redirect("/settingQuote");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
