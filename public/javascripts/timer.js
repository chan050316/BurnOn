const coverPageEndTimer = document.querySelector("#coverPage-endTimerJS");
const coverPageTyping = coverPageEndTimer.querySelector("#coverPage-typingJS");
const coverPageBtn = coverPageEndTimer.querySelector("#coverPage-btnJS");
const loadingLeft = document.querySelector("#loadingLeftJS");
const loadingRight = document.querySelector("#loadingRightJS");
const timer = document.querySelector("#timerJS");
const timerNums = timer.querySelectorAll(".timerNumJS");
const timerTimeBoxs = timer.querySelectorAll(".timerTimeBoxJS");
const timerHours = timer.querySelectorAll(".timerHourJS");
const timerMinutes = timer.querySelectorAll(".timerMinuteJS");
const timerSeconds = timer.querySelectorAll(".timerSecondJS");
const timerStart = document.querySelector("#timerStartJS");
const timerStop = document.querySelector("#timerStop");
const timerEnd = document.querySelector("#timerEnd");

let timerNumValue = [];
let countHourNum = 0;
let countMinuteNum = 0;
let countSecondNum = 0;
let firtsConnect = true;
let intervalTimerJS;

function openAlarmPage() {
  coverPageEndTimer.style.display = "flex";
}
function closeAlarmPage() {
  coverPageEndTimer.style.display = "none";
  alarm.pause(); //in audio.js
}
function inputMaxlength() {
  if (this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
}
function timerStarting() {
  if (
    timerNums[0].value <= 20 &&
    timerNums[1].value !== "" &&
    timerNums[1].value <= 60
  ) {
    timerStart.style.display = "none";
    timerStop.style.display = "flex";
    timerNums.forEach(El => {
      El.classList.add("hidden");
      timerNumValue.push(El.value);
      console.log(timerNumValue);
    });
    timerTimeBoxs.forEach(El => {
      El.classList.remove("hidden");
    });

    timerHours.forEach(El => {
      El.style.transform = `translateY(-${
        timerNumValue[0] * 35 - countHourNum * 35
      }px)`;
    });
    timerMinutes.forEach(El => {
      El.style.transform = `translateY(-${
        timerNumValue[1] * 35 - countMinuteNum * 35
      }px)`;
    });

    loadingLeft.style.animationPlayState = "running";
    loadingRight.style.animationPlayState = "running";

    loadingLeft.style.animationName = "showPercent__left";
    loadingLeft.style.animationDuration = `${Number(
      (timerNumValue[0] * 3600 + timerNumValue[1] * 60) / 2
    )}s`;
    loadingLeft.style.animationDelay = `${Number(
      (timerNumValue[0] * 3600 + timerNumValue[1] * 60) / 2
    )}s`;
    loadingRight.style.animationName = "showPercent__right";
    loadingRight.style.animationDuration = `${Number(
      (timerNumValue[0] * 3600 + timerNumValue[1] * 60) / 2
    )}s`;
    if (firtsConnect === true) {
      timerSeconds.forEach(El => {
        El.style.transform = `translateY(-${60 * 35}px)`;
      });
      countingMinute();
      firtsConnect = false;
    }
    intervalTimerJS = setInterval(countingSecond, 1000);
  } else if (timerNums[0].value > 20) {
    notyfError.open({
      type: "error",
      message: "20시간보다 적은 값을 입력해주세요ㅠㅠㅠ 후엥",
    });
  } else if (timerNums[1].value > 60) {
    notyfError.open({
      type: "error",
      message: "60분보다 적은 값을 입력해주세요ㅠㅠㅠ 후엥",
    });
  } else if (timerNums[1].value === "" && timerNums[0].value === "") {
    notyfError.open({
      type: "error",
      message: "값을 입력해주세요ㅠㅠㅠ 후엥",
    });
  } else if (timerNums[1].value === "") {
    timerNums[1].value = 0;
    timerStarting();
  }
}
function countingSecond() {
  if (countSecondNum == 60) {
    countSecondNum = 0;
    countingMinute();
  } else {
    countSecondNum++;
    timerSeconds.forEach(El => {
      El.style.transform = `translateY(-${60 * 35 - countSecondNum * 35}px)`;
    });
  }
}
function countingMinute() {
  if (countMinuteNum == timerNumValue[1] && timerNumValue[1] !== 0) {
    timerNumValue[1] = 60;
    timerNums[1].value = 60;
    countMinuteNum = 0;
    countingHour();
  } else {
    countMinuteNum++;
    timerMinutes.forEach(El => {
      El.style.transform = `translateY(-${
        60 * 35 - (60 - timerNumValue[1]) * 35 - countMinuteNum * 35
      }px)`;
    });
  }
}
function countingHour() {
  countHourNum++;
  if (countHourNum - 1 == timerNumValue[0]) {
    initAlarm(); //in audio.js
    initTestAlarm(); //in audio.js
    alarm.play(); //in audio.js
    timerEnding();
    openAlarmPage();
  } else {
    timerHours.forEach(El => {
      El.style.transform = `translateY(-${
        60 * 35 - (60 - timerNumValue[0]) * 35 - countHourNum * 35
      }px)`;
    });
    countMinuteNum = 0;
    countingMinute();
    // if (countHourNum == timerNumValue[0]) {
    //   // if the remaining time is less than 1 hour
    //   timerTimeBoxs[0].style = "display:none";
    //   timerTimeBoxs[2].style = "display:block";
    // }
  }
}
function timerStoping() {
  timerStart.style.display = "flex";
  timerStop.style.display = "none";
  loadingLeft.style.animationPlayState = "paused";
  loadingRight.style.animationPlayState = "paused";

  timerNumValue = [];
  clearInterval(intervalTimerJS);
}
function timerEnding() {
  timerNums.forEach(El => {
    El.classList.remove("hidden");
    El.value = "";
  });
  timerTimeBoxs.forEach(El => {
    El.classList.add("hidden");
  });
  timerStart.style.display = "flex";
  timerStop.style.display = "none";

  loadingLeft.style.animationName = "init";
  loadingRight.style.animationName = "init";

  loadingLeft.style.transform = "rotate(180deg)";
  loadingRight.style.transform = "rotate(180deg)";

  timerNumValue = [];

  clearInterval(intervalTimerJS);
  countHourNum = 0;
  countMinuteNum = 0;
  countSecondNum = 0;
  firtsConnect = true;
}
function keyup(e) {
  if (e.key === " ") {
    checkMusicCondition();
  } else if (e.key === "Enter") {
    timerStarting();
  }
}

coverPageBtn.addEventListener("click", closeAlarmPage);
timerNums.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});
timerStart.addEventListener("click", timerStarting);
timerStop.addEventListener("click", timerStoping);
timerEnd.addEventListener("click", timerEnding);
window.addEventListener("keyup", keyup);
