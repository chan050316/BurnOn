const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "left",
    y: "bottom",
  },
  types: [
    {
      type: "error",
      background: "red",
      duration: 3000,
      ripple: false,
    },
  ],
});

const loadingLeft = document.querySelector("#loadingLeftJS");
const loadingRight = document.querySelector("#loadingRightJS");
const timer = document.querySelector("#timerJS");
const timerNums = timer.querySelectorAll(".timerNumJS");
const timerTimeBoxs = timer.querySelectorAll(".timerTimeBoxJS");
const timerHours = timer.querySelectorAll(".timerHourJS");
const timerMinutes = timer.querySelectorAll(".timerMinuteJS");
const timerSeconds = timer.querySelectorAll(".timerSecondJS");
const timerStart = document.querySelector("#timerStart");
const timerStop = document.querySelector("#timerStop");
const timerEnd = document.querySelector("#timerEnd");

let timerNumValue = [];
let countHourNum = 0;
let countMinuteNum = 0;
let countSecondNum = 0;
let firtsConnect = true;

function inputMaxlength() {
  if (this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
}
function timerStarting() {
  if (timerNums[0].value < 24 && timerNums[1].value < 60) {
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

    // 입력된게 숫자가 아니라면 알림 띄우기
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
      countingSecond();
      firtsConnect = false;
    }
    window.countSecond = setInterval(countingSecond, 1000);
  } else if (timerNums[0].value > 24) {
    notyf.open({
      type: "error",
      message: "24시간보다 작게 입력해주세요ㅠㅠㅠ 후엥",
    });
  } else if (timerNums[1].value > 60) {
    notyf.open({
      type: "error",
      message: "60분보다 적은 값을 입력해주세요ㅠㅠㅠ 후엥",
    });
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
    console.log(countSecondNum);
  }
}
function countingMinute() {
  if (countMinuteNum == timerNumValue[1]) {
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
    console.log(countMinuteNum);
  }
}
function countingHour() {
  countHourNum++;
  if (countHourNum - 1 == timerNumValue[0]) {
    timerEnding();
    alert("Done...!");
  } else {
    timerHours.forEach(El => {
      El.style.transform = `translateY(-${
        60 * 35 - (60 - timerNumValue[0]) * 35 - countHourNum * 35
      }px)`;
    });
  }
}
function timerStoping() {
  timerStart.style.display = "flex";
  timerStop.style.display = "none";
  loadingLeft.style.animationPlayState = "paused";
  loadingRight.style.animationPlayState = "paused";

  timerNumValue = [];
  clearInterval(window.countSecond);
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

  clearInterval(window.countSecond);
  countHourNum = 0;
  countMinuteNum = 0;
  countSecondNum = 0;
  firtsConnect = true;
}

timerNums.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});
timerStart.addEventListener("click", timerStarting);
timerStop.addEventListener("click", timerStoping);
timerEnd.addEventListener("click", timerEnding);
