const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const musicRadioInput = document.querySelectorAll(".musicRadioInputJS");
const musicNameJS = document.querySelector(".musicNameJS");

let audio = new Audio("/audios/" + musicNameJS.innerText + ".mp3");

musicRadioInput[0].checked = true;
audio.loop = false; // 반복재생하지 않음
audio.volume = 1;
console.log(audio);

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

btnPlay.addEventListener("click", playingMusic);
musicRadioInput.forEach(input => {
  input.addEventListener("click", changingMusic);
});
