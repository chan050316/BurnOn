const titleBox_title = document.querySelectorAll(".titleBox_titleJS");

const INNERTEXT = ["Timer", "Pomodoro", "Custom"];

for (i in titleBox_title) {
  titleBox_title[i].innerText = INNERTEXT[i];
}
