const timer = document.querySelector("#timerJS");
const timerNums = timer.querySelectorAll(".timerNumJS");
const timerTimeBoxs = timer.querySelectorAll(".timerTimeBoxJS");
const timerHours = timer.querySelectorAll(".timerHourJS");
const timerMinutes = timer.querySelectorAll(".timerMinuteJS");
const timerStart = document.querySelector("#timerStart");
const timerStop = document.querySelector("#timerStop");
const timerEnd = document.querySelector("#timerEnd");

const timerNumValue = [];
let countHourNum = 0;
let countMinuteNum = 0;

function inputMaxlength() {
  if (this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
}
function timerStarting() {
  timerStart.style.display = "none";
  timerStop.style.display = "flex";
  timerNums.forEach(El => {
    El.classList.add("hidden");
    timerNumValue.push(El.value);
  });
  timerTimeBoxs.forEach(El => {
    El.classList.remove("hidden");
  });
  // 입력된게 숫자가 아니라면 알림 띄우기
  timerHours.forEach(El => {
    El.style.transform = `translateY(-${
      timerNumValue[0] * 40 - countHourNum * 40
    }px)`;
  });
  timerMinutes.forEach(El => {
    El.style.transform = `translateY(-${
      timerNumValue[1] * 40 - countMinuteNum * 40
    }px)`;
  });
  window.countHour = setInterval(countingHour, 60000);
  window.countMinute = setInterval(countingMinute, 1000);
}
function countingHour() {
  countHourNum++;
  if (countHourNum == timerNumValue[0]) {
    console.log("Done...!");
  } else {
    timerHours.forEach(El => {
      El.style.transform = `translateY(-${
        60 * 40 - (60 - timerNumValue[0]) * 40 - 40 * countHourNum
      }px)`;
    });
  }
}
function countingMinute() {
  if (countHourNum == timerNumValue[0]) {
    console.log("Done...!");
  } else if (countMinuteNum == timerNumValue[1]) {
    timerNumValue[1] = 60;
    countMinuteNum = 0;
  } else {
    countMinuteNum++;
    timerMinutes.forEach(El => {
      El.style.transform = `translateY(-${
        60 * 40 - (60 - timerNumValue[1]) * 40 - 40 * countMinuteNum
      }px)`;
    });
  }
  console.log(countMinuteNum);
}
function timerStoping() {
  timerStart.style.display = "flex";
  timerStop.style.display = "none";

  clearInterval(window.countHour);
  clearInterval(window.countMinute);
}
function timerEnding() {
  timerNums.forEach(El => {
    El.classList.remove("hidden");
  });
  timerTimeBoxs.forEach(El => {
    El.classList.add("hidden");
  });
  timerStart.style.display = "flex";
  timerStop.style.display = "none";

  clearInterval(window.countHour);
  clearInterval(window.countMinute);
  countHourNum = 0;
  countMinuteNum = 0;
}

timerNums.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});
timerStart.addEventListener("click", timerStarting);
timerStop.addEventListener("click", timerStoping);
timerEnd.addEventListener("click", timerEnding);
