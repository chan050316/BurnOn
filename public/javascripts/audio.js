const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const musicRadioInput = document.querySelectorAll(".musicRadioInputJS");

let audio = new Audio("/audios/Hollow Knight - lofi chill mix.mp3");

// 음악 고르게 할 때는 src바꾸면 될 듯
//

audio.loop = false; // 반복재생하지 않음
audio.volume = 1;
console.log(audio);

function playingMusic() {
  if (iconPlay.className === "material-icons icon-pause") {
    iconPlay.innerHTML = "&#xe034;";
    audio.play();

    console.log("play");
  } else {
    iconPlay.innerHTML = "&#xe037;";
    audio.pause();

    console.log("pause");
  }
  iconPlay.classList.toggle("icon-play");
}

function changingMusic() {
  audio.pause();
  console.log("pause");
  iconPlay.innerHTML = "&#xe037;";
  iconPlay.classList.remove("icon-play");

  const musicName = this.id;
  audio = new Audio("/audios/" + musicName + ".mp3");
  playingMusic();
}

btnPlay.addEventListener("click", playingMusic);
musicRadioInput.forEach(input => {
  input.addEventListener("click", changingMusic);
});
