const introBox = document.querySelector("#intro-box");
const introTextBox = document.querySelectorAll(".introText-box");
const introBtn = document.querySelectorAll(".introBtnJS");
const introText = document.querySelectorAll(".intro-text");

let page = 1;

const INTROTEXTS = [
  "뽀모도로가 처음이신가요?",
  "뽀모도로란 루틴을 생성해주는 타이머에요!",
  "지금부터 시작해볼까요?",
];
for (i in INTROTEXTS) {
  introText[i].innerHTML = INTROTEXTS[i];
}

function sliding() {
  if (page === INTROTEXTS.length) {
    introBox.style.display = "none";
  } else {
    introTextBox.forEach(Box => {
      Box.style.transform = `translateX(-${page * 100}vw)`;
    });
    page += 1;
  }
}

introBtn.forEach(btn => {
  btn.addEventListener("click", sliding);
});
