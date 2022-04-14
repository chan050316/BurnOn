const introInputsBox = document.querySelector("#intro-inputs-box");
const introBox = document.querySelector("#intro-box");
const inputBtn = document.querySelector("#inputBtnJS");
const introTextBox = document.querySelectorAll(".introText-box");
const introBtn = document.querySelectorAll(".introBtnJS");
const introText = document.querySelectorAll(".intro-text");
const iconIntroClose = document.querySelectorAll(".icon-intro-closeJS");
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

  CDCircle.style.animationPlayState = "running";
}

introBtn.forEach(btn => {
  btn.addEventListener("click", sliding);
});
iconIntroClose.forEach(icon => {
  icon.addEventListener("click", closeIntro);
});
inputBtn.addEventListener("click", startingPomodoro);
