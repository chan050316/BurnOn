const notyfError = new Notyf({
  position: {
    x: "left",
    y: "bottom",
  },
  types: [
    {
      type: "error",
      background: "red",
      duration: 2000,
      ripple: false,
    },
  ],
});

const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const iconSkip = document.querySelector("#icon-skipJS");
const iconBack = document.querySelector("#icon-backJS");
const musicRadioInputs = document.querySelectorAll(".musicRadioInputJS");
const musicNames = document.querySelectorAll(".musicNameJS");
const musicEndPoint = document.querySelector("#musicEndPointJS");
const minuteLineFill = document.querySelector("#minuteLineFillJS");
const musicDurationsEl = document.querySelectorAll(".musicDurationsElJS");

let minuteFcCount = 1;
let intervalAudioJS;
let audioDuration;
let musicDurations = [];
let musicNumId = 0;
let audio = new Audio("/audios/" + musicNames[musicNumId].innerText + ".mp3");

musicRadioInputs[0].checked = true;
audio.loop = false; // 반복재생하지 않음
audio.volume = 1;

let i = 0;
musicNames.forEach(El => {
  let music = new Audio("/audios/" + El.innerText + ".mp3");
  music.addEventListener("loadedmetadata", () => {
    const CalcDuration = String(music.duration).substr(
      0,
      String(music.duration).indexOf(".")
    );
    const durationRefined = moment.utc(CalcDuration * 1000).format("HH:mm:ss");
    musicDurations.push(durationRefined);
    musicDurationsEl[i].innerText = musicDurations[i];
    i++;
  });
});

function showAudioDuration(audioFile) {
  audio.addEventListener("loadedmetadata", () => {
    const duration = audioFile.duration;
    const CalcDuration = String(duration).substr(
      0,
      String(duration).indexOf(".")
    );
    audioDuration = CalcDuration;
    const durationRefined = moment.utc(CalcDuration * 1000).format("HH:mm:ss");
    musicEndPoint.innerText = durationRefined;
  });
}
function checkMusicCondition() {
  if (iconPlay.className === "material-icons icon-pause") {
    playingMusic();
  } else {
    pauseMusic();
  }
}
function playingMusic() {
  iconPlay.innerHTML = "&#xe034;";
  audio.play();
  iconPlay.classList.add("icon-play");
  intervalAudioJS = setInterval(minuteLineFilling, 1000);

  console.log("play");
}
function pauseMusic() {
  audio.pause();
  console.log("pause");
  iconPlay.innerHTML = "&#xe037;";
  iconPlay.classList.remove("icon-play");
  clearInterval(intervalAudioJS);
}
function changingMusic() {
  pauseMusic();
  musicNumId = Number(this.id);
  audio = new Audio("/audios/" + musicNames[musicNumId].innerText + ".mp3");
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
  console.log(musicNumId);
  musicNumId++;
  if (musicNumId >= 0 && musicNumId < musicRadioInputs.length) {
    pauseMusic();
    audio = new Audio("/audios/" + musicNames[musicNumId].innerText + ".mp3");
    minuteFcCount = 1;
    audio.load();
    showAudioDuration(audio);
    playingMusic();
    musicRadioInputs.forEach(input => {
      if (musicNumId === Number(input.id)) {
        input.checked = true;
      }
    });
  } else {
    notyfError.open({
      type: "error",
      message: "노래가 더 없어요ㅠ",
    });
    musicNumId--;
  }
}
function backingMusic() {
  console.log(musicNumId);
  musicNumId--;
  if (musicNumId >= 0 && musicNumId < musicRadioInputs.length) {
    pauseMusic();
    audio = new Audio("/audios/" + musicNames[musicNumId].innerText + ".mp3");
    minuteFcCount = 1;
    audio.load();
    showAudioDuration(audio);
    playingMusic();
    musicRadioInputs.forEach(input => {
      console.log();
      if (musicNumId === Number(input.id)) {
        input.checked = true;
      }
    });
  } else {
    notyfError.open({
      type: "error",
      message: "노래가 더 없어요ㅠ",
    });
    musicNumId++;
  }
}

showAudioDuration(audio);

btnPlay.addEventListener("click", checkMusicCondition);
musicRadioInputs.forEach(input => {
  input.addEventListener("click", changingMusic);
});
iconSkip.addEventListener("click", skipingMusic);
iconBack.addEventListener("click", backingMusic);
