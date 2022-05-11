const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const audio = new Audio("/audios/Hollow Knight - lofi chill mix.mp3");

audio.loop = false; // 반복재생하지 않음

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

btnPlay.addEventListener("click", playingMusic);
