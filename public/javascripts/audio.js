const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const iconSkip = document.querySelector("#icon-skipJS");
const iconBack = document.querySelector("#icon-backJS");
const musicRadioInput = document.querySelectorAll(".musicRadioInputJS");
const musicNameJS = document.querySelectorAll(".musicNameJS");

let audio = new Audio("/audios/" + musicNameJS[0].innerText + ".mp3");

musicRadioInput[0].checked = true;
audio.loop = false; // 반복재생하지 않음
audio.volume = 1;

function playingMusic() {
  if (iconPlay.className === "material-icons icon-pause") {
    iconPlay.innerHTML = "&#xe034;";
    audio.play();
    iconPlay.classList.add("icon-play");

    console.log("play");
  } else {
    pauseMusic();
  }
}
function pauseMusic() {
  audio.pause();
  console.log("pause");
  iconPlay.innerHTML = "&#xe037;";
  iconPlay.classList.remove("icon-play");
}
function changingMusic() {
  pauseMusic();

  const musicName = this.id;
  audio = new Audio("/audios/" + musicName + ".mp3");
  playingMusic();
}
function skipingMusic() {
  audio.pause();
  console.dir(audio);
}
function backingMusic() {}

btnPlay.addEventListener("click", playingMusic);
musicRadioInput.forEach(input => {
  input.addEventListener("click", changingMusic);
});
iconSkip.addEventListener("click", skipingMusic);
iconBack.addEventListener("click", backingMusic);
