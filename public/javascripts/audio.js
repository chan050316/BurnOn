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
const alarmRadioInputs = document.querySelectorAll("alarmRadioInputJS");
const alarmNames = document.querySelectorAll(".alarmNameJS");
const iconAlarmPlays = document.querySelectorAll(".icon-alarmPlayJS");

let minuteFcCount = 1;
let intervalAudioJS;
let audioDuration;
let musicDurations = [];
let musicNumId = 0;
let audio = new Audio("/audios/" + musicNames[musicNumId].innerText + ".mp3");

let alarmNumId = 0;
let alarm = new Audio(`/alarmSounds/${alarmNames[alarmNumId].innerText}.mp3`);

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
    // console.log(minuteLineFill.style.width);
    minuteLineFill.style.width = `${minuteLineGo * minuteFcCount}%`;
    minuteFcCount++;
  }
}
function skipingMusic() {
  // console.log(musicNumId);
  musicNumId++;
  console.log(musicNumId);
  console.log(musicRadioInputs.length);
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
  // console.log(musicNumId);
}
function backingMusic() {
  // console.log(musicNumId);
  musicNumId--;
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
    musicNumId++;
  }
  // console.log(musicNumId);
}
function checkAlarmCondition() {
  alarmNumId = this.parentNode.previousSibling.id;
  initAlarm();
  // console.log(alarmNumId);
  if (this.className === "material-icons icon-pause icon-alarmPlayJS") {
    playingAlarm(alarmNumId);
  } else {
    pauseAlarm(alarmNumId);
  }
}
function playingAlarm(inputID) {
  iconAlarmPlays[inputID].innerHTML = "&#xe034;";
  alarm = new Audio(`/alarmSounds/${alarmNames[inputID].innerText}.mp3`);
  alarm.load();
  alarm.play();
  iconAlarmPlays[inputID].classList.add("icon-play");
  console.log("play");
}
function pauseAlarm(inputID) {
  iconAlarmPlays[inputID].innerHTML = "&#xe037;";
  alarm.pause();
  iconAlarmPlays[inputID].classList.remove("icon-play");
  console.log("pause");
}
function initAlarm() {
  alarm.pause();
  alarm.currentTime = 0;
  iconAlarmPlays.forEach(El => {
    El.classList.remove("icon-play");
    El.innerHTML = "&#xe037;";
  });
}

showAudioDuration(audio);

btnPlay.addEventListener("click", checkMusicCondition);
musicRadioInputs.forEach(input => {
  input.addEventListener("click", changingMusic);
});
iconSkip.addEventListener("click", skipingMusic);
iconBack.addEventListener("click", backingMusic);
iconAlarmPlays.forEach(El => {
  El.addEventListener("click", checkAlarmCondition);
});
