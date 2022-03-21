const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");

function playingMusic() {
  if (iconPlay.className === "material-icons icon-pause icon-play") {
    iconPlay.innerHTML = "&#xe034;";
  } else {
    iconPlay.innerHTML = "&#xe037;";
  }
  iconPlay.classList.toggle("icon-play");
}

btnPlay.addEventListener("click", playingMusic);
