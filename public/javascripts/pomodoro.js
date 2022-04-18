const introInputsBox = document.querySelector("#intro-inputs-box");
const inputs = introInputsBox.querySelectorAll("input");
const introBox = document.querySelector("#intro-box");
const inputBtn = document.querySelector("#inputBtnJS");
const introTextBox = document.querySelectorAll(".introText-box");
const introBtn = document.querySelectorAll(".introBtnJS");
const introText = document.querySelectorAll(".intro-text");
const iconIntroClose = document.querySelectorAll(".icon-intro-closeJS");
const loadingLeft = document.querySelector("#loadingLeftJS");
const loadingRight = document.querySelector("#loadingRightJS");
const CDCircle = document.querySelector("#CDCircleJS");

let page = 1;

const INTROTEXTS = [
  "뽀모도로가 처음이신가요?",
  "뽀모도로란 루틴을 생성해주는 타이머에요!",
  "지금부터 시작해볼까요?",
  "시간을 입력해 주세요!",
];
for (i in INTROTEXTS) {
  introText[i].innerHTML = INTROTEXTS[i];
}
//if cookie 가 없음 시 closeIntro 작동

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
  introInputsBox.remove();

  const inputValues = [];

  inputs.forEach(input => {
    inputValues.push(input.value);
  });

  const WorkCDDuration = inputValues[0] * 3600 + inputValues[1] * 60;
  const WorkCDRotate = (inputValues[0] * 60 + inputValues[1]) * 360;

  pomodoroWork(WorkCDDuration, WorkCDRotate);
  setTimeout(pomodoroBreak, WorkCDDuration * 1000);
}
function pomodoroWork(WorkCDDuration, WorkCDRotate) {
  timerinit();
  CDCircle.style.transform = `rotate(${WorkCDRotate}deg)`;
  CDCircle.style.transitionDuration = `${WorkCDDuration}s`;

  loadingLeft.style.animationName = "showPercent__left";
  loadingRight.style.animationName = "showPercent__right";

  loadingLeft.style.animationPlayState = "running";
  loadingRight.style.animationPlayState = "running";

  loadingLeft.style.animationDuration = `${WorkCDDuration / 2}s`;
  loadingLeft.style.animationDelay = `${WorkCDDuration / 2}s`;
  loadingRight.style.animationDuration = `${WorkCDDuration / 2}s`;
}
function pomodoroBreak() {
  timerinit();
  alert("a");
}
function timerinit() {
  CDCircle.style.transform = "rotate(0deg)";
  CDCircle.style.transitionDuration = "0s";

  loadingLeft.style.animationPlayState = "paused";
  loadingRight.style.animationPlayState = "paused";

  loadingLeft.style.animationName = "init";
  loadingRight.style.animationName = "init";
  alert("a");
}

inputs.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});
introBtn.forEach(btn => {
  btn.addEventListener("click", sliding);
});
iconIntroClose.forEach(icon => {
  icon.addEventListener("click", closeIntro);
});
inputBtn.addEventListener("click", startingPomodoro);
