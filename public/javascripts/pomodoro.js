const introInputsBox = document.querySelector("#intro-inputs-box");
const inputs = introInputsBox.querySelectorAll("input");
const introBox = document.querySelector("#intro-box");
const inputBtn = document.querySelector("#inputBtnJS");
const introTextBox = document.querySelectorAll(".introText-box");
const introBtn = document.querySelectorAll(".introBtnJS");
const introText = document.querySelectorAll(".intro-text");
const iconIntroClose = document.querySelector(".icon-intro-closeJS");
const coverPageEndTimer = document.querySelector("#coverPage-endTimerJS");
const coverPageTyping = coverPageEndTimer.querySelector("#coverPage-typingJS");
const coverPageBtn = coverPageEndTimer.querySelector("#coverPage-btnJS");
const loadingLeft = document.querySelector("#loadingLeftJS");
const loadingRight = document.querySelector("#loadingRightJS");
const CDCircle = document.querySelector("#CDCircleJS");
const timeCondition = document.querySelector("#inside-CDCircle-timeJS");

let page = 1;
let CDRotate = 0;
let workCDDuration;
let workCDRotate;
let PomodoroCDDuration;
let PomodoroCDRotate;
let audioPlayingState = false;

const INTROTEXTS = [
  "뽀모도로가 처음이신가요?",
  "지금부터 설명해드릴게요!",
  "뽀모도로란,",
  "루틴을 생성해주는 타이머에요!",
  "일할 시간과 쉴 시간을 설정하면",
  "그때 그때 알람을 울려줍니다!",
  "그럼 시작해볼까요?",
];
// 수정할 때 html for문도 같이 수정해줄 것

for (i in INTROTEXTS) {
  introText[i].innerHTML = INTROTEXTS[i];
}

if (document.cookie.indexOf("FirstTime") === 39) {
  // if more than first time visit page
  // The first time is 'document.cookie.indexOf("FirstTime") === 35'
  closeIntro();
}

function inputMaxlength() {
  if (this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
}
function sliding() {
  if (page === INTROTEXTS.length) {
    introBox.remove();
  } else {
    introTextBox.forEach(Box => {
      Box.style.transform = `translateX(-${page * 100}vw)`;
    });
    page += 1;
  }
}

function closeIntro() {
  introBox.remove();
}
function startingPomodoro() {
  const inputValues = [];

  inputs.forEach(input => {
    console.log(input.value);
    inputValues.push(Number(input.value));
  });

  console.log(inputValues);
  console.log(inputValues[0] === 0 || inputValues[1] === 0);

  if (
    (inputValues[0] === 0 && inputValues[1] === 0) ||
    (inputValues[2] === 0 && inputValues[3] === 0) ||
    (inputValues[0] === 0 &&
      inputValues[1] === 0 &&
      inputValues[2] === 0 &&
      inputValues[3] === 0)
  ) {
    notyfError.open({
      type: "error",
      message: "값을 입력해주세요ㅠ",
    });
  } else {
    introInputsBox.remove();

    workCDDuration = inputValues[0] * 3600 + inputValues[1] * 60;
    workCDRotate = (inputValues[0] * 60 + inputValues[1]) * 360;
    PomodoroCDDuration = inputValues[2] * 3600 + inputValues[3] * 60;
    PomodoroCDRotate = (inputValues[2] * 60 + inputValues[3]) * 360;
    pomodoroWork(workCDDuration, workCDRotate);

    console.log(workCDDuration);
    console.log(PomodoroCDDuration);
  }
}
function pomodoroWork(duration, rotate) {
  timeCondition.innerHTML = "Work";
  coverPageTyping.innerText = "Break Time";

  CDCircle.style.transform = `rotate(${(CDRotate += rotate)}deg)`;
  CDCircle.style.transitionDuration = `${duration}s`;

  loadingLeft.style.animationName = "showPercent__leftWork";
  loadingRight.style.animationName = "showPercent__rightWork";

  loadingLeft.style.animationPlayState = "running";
  loadingRight.style.animationPlayState = "running";

  loadingLeft.style.animationDuration = `${duration / 2}s`;
  loadingLeft.style.animationDelay = `${duration / 2}s`;
  loadingRight.style.animationDuration = `${duration / 2}s`;
  setTimeout(timerinit, duration * 1000);
}
function pomodoroBreak(duration, rotate) {
  timeCondition.innerHTML = "Break";
  coverPageTyping.innerText = "Work Time";

  CDCircle.style.transform = `rotate(${(CDRotate += rotate)}deg)`;
  CDCircle.style.transitionDuration = `${duration}s`;

  loadingLeft.style.transform = "rotate(180deg)";
  loadingRight.style.transform = "rotate(180deg)";

  loadingLeft.style.animationName = "showPercent__leftBreak";
  loadingRight.style.animationName = "showPercent__rightBreak";

  loadingLeft.style.animationPlayState = "running";
  loadingRight.style.animationPlayState = "running";

  loadingLeft.style.animationDuration = `${duration / 2}s`;
  loadingLeft.style.animationDelay = `${duration / 2}s`;
  loadingRight.style.animationDuration = `${duration / 2}s`;

  setTimeout(timerinit, duration * 1000);
}
function timerinit() {
  loadingLeft.style.animationName = "init";
  loadingRight.style.animationName = "init";

  loadingLeft.style.animationDuration = "";
  loadingLeft.style.animationDelay = "";
  loadingRight.style.animationDuration = "";
  openAlarmPage();
}
function openAlarmPage() {
  if (!audio.paused) {
    console.log(1);
    audioPlayingState = true;
  }
  initAlarm(); //in audio.js
  initTestAlarm(); //in audio.js
  alarm.play(); //in audio.js
  coverPageEndTimer.style.display = "flex";
}
function closeAlarmPage() {
  coverPageEndTimer.style.display = "none";
  alarm.pause();
  alarm.currentTime = 0;
  console.log(audioPlayingState);
  if (audioPlayingState === true) {
    audio.play();
  }
  if (timeCondition.innerHTML === "Work") {
    pomodoroBreak(PomodoroCDDuration, PomodoroCDRotate);
  } else if (timeCondition.innerHTML === "Break") {
    pomodoroWork(workCDDuration, workCDRotate);
  }
}
function keyup(e) {
  if (e.key === " ") {
    checkMusicCondition();
  } else if (e.key === "Enter") {
    startingPomodoro();
  }
}

coverPageBtn.addEventListener("click", closeAlarmPage);
inputs.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});
introBtn.forEach(btn => {
  btn.addEventListener("click", sliding);
});
iconIntroClose.addEventListener("click", closeIntro);
inputBtn.addEventListener("click", startingPomodoro);
window.addEventListener("keyup", keyup);
