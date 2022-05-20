const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const iconSkip = document.querySelector("#icon-skipJS");
const iconBack = document.querySelector("#icon-backJS");
const musicRadioInput = document.querySelectorAll(".musicRadioInputJS");
const musicNameJS = document.querySelectorAll(".musicNameJS");
const musicEndPoint = document.querySelector("#musicEndPointJS");
const minuteLineFill = document.querySelector("#minuteLineFillJS");

let audio = new Audio("/audios/" + musicNameJS[0].innerText + ".mp3");
let minuteFcCount = 1;
let interval;
let audioDuration;

musicRadioInput[0].checked = true;
audio.loop = false; // 반복재생하지 않음
audio.volume = 1;

function showAudioDuration(audioFile) {
  audio.addEventListener("loadedmetadata", () => {
    let duration = null;
    if (audioFile.target === undefined) {
      duration = audioFile.duration;
    } else {
      duration = audioFile.target.duration;
    }
    const CalcDuration = String(duration).substr(
      0,
      String(duration).indexOf(".")
    );
    audioDuration = CalcDuration;
    const durationRefined = moment.utc(CalcDuration * 1000).format("HH:mm:ss");
    musicEndPoint.innerText = durationRefined;
  });
}
function playingMusic() {
  if (iconPlay.className === "material-icons icon-pause") {
    iconPlay.innerHTML = "&#xe034;";
    audio.play();
    iconPlay.classList.add("icon-play");
    interval = setInterval(minuteLineFilling, 1000);

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
  clearInterval(interval);
}
function changingMusic() {
  pauseMusic();

  const musicName = this.id;
  audio = new Audio("/audios/" + musicName + ".mp3");
  audio.load();
  showAudioDuration(audio);
  minuteFcCount = 1;
  playingMusic();
}
function minuteLineFilling() {
  console.log(minuteFcCount);
  const minuteLineGo = 100 / audioDuration;
  if (100 === minuteLineGo * minuteFcCount) {
    alert("music done");
  } else {
    console.log(minuteLineFill.style.width);
    minuteLineFill.style.width = `${minuteLineGo * minuteFcCount}%`;
    minuteFcCount++;
  }
}
function skipingMusic() {
  audio.pause();
  console.dir(audio);
}
function backingMusic() {}

showAudioDuration(audio);

btnPlay.addEventListener("click", playingMusic);
musicRadioInput.forEach(input => {
  input.addEventListener("click", changingMusic);
});
iconSkip.addEventListener("click", skipingMusic);
iconBack.addEventListener("click", backingMusic);
