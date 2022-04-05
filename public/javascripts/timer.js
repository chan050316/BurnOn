const timer = document.querySelector("#timerJS");
const timerNums = timer.querySelectorAll(".timerNumJS");
const timerTimeBoxs = timer.querySelectorAll(".timerTimeBoxJS");
const timerStart = document.querySelector("#timerStart");
const timerStop = document.querySelector("#timerStop");
const timerEnd = document.querySelector("#timerEnd");

function inputMaxlength() {
  if (this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
}
function timerStarting() {
  const timerNumValue = [];
  timerStart.style.display = "none";
  timerStop.style.display = "flex";
  timerNums.forEach(El => {
    El.classList.add("hidden");
    timerNumValue.push(El.value);
  });
  timerTimeBoxs.forEach(El => {
    El.classList.remove("hidden");
  });
  console.log(timerNumValue);
  // 입력된게 숫자가 아니라면 알림 띄우기
}
function timerStoping() {
  timerStart.style.display = "flex";
  timerStop.style.display = "none";
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
}

timerNums.forEach(input => {
  input.addEventListener("input", inputMaxlength);
});

timerStart.addEventListener("click", timerStarting);
timerStop.addEventListener("click", timerStoping);
timerEnd.addEventListener("click", timerEnding);
