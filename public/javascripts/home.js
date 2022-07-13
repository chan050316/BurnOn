const titleCover = document.querySelector("#titleCoverJS");
const titleBoxTitle = document.querySelectorAll(".titleBox_titleJS");
const customForm = document.querySelector("#customForm");
const currentTime = document.querySelector("#currentTimeJS");
const schedule = document.querySelector("#scheduleJS");
const cafeteriaMenu = document.querySelector("#cafeteriaMenuJS");
const cafeteriaMenuLunch = document.querySelector("#cafeteriaMenuJS__lunch");
const cafeteriaMenuDinner = document.querySelector("#cafeteriaMenuJS__dinner");
const todayWeather = document.querySelector("#todayWeatherJS");

// const hangangRiverTmpURL = "http://hangang.dkserver.wo.tc/";
// fetch(hangangRiverTmpURL, {
//   mode: "no-cors",
//   method: "get",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });

const getCookie = key => {
  let cookieKey = key + "=";
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    if (cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }

    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};

const customOption = getCookie("customOption");
const countDownName = "배움장터";
const countDownDate = new Date("July 14, 2022 00:00:00").getTime();
const cafeteriaMenuText = cafeteriaMenu.innerHTML;

if (customOption) {
  customForm.style.display = "none";
  const customEl = document.querySelector(`.customOption_${customOption}`);
  console.log(customOption);
  customEl.style.display = "block";
} else {
  console.log("it's not cookie!");
}

// function siteStartAnimation() {
//   titleCover.style
// }

function getTime() {
  const date = new Date();
  const day = String(date.getDay()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // option-showSchedule
  const distance = countDownDate - date;
  const Dday = Math.ceil(distance / (1000 * 60 * 60 * 24));
  if (Dday === 0) {
    schedule.innerHTML = `${countDownName} D-day`;
  } else {
    schedule.innerHTML = `${countDownName} D-${Dday}`;
  }

  // option-showcafeteriaMenu
  const cafeteriaMenuJson = JSON.parse(cafeteriaMenuText);
  const DAYOFWEEK = [
    cafeteriaMenuJson.Sun,
    cafeteriaMenuJson.Mon,
    cafeteriaMenuJson.Tue,
    cafeteriaMenuJson.Wed,
    cafeteriaMenuJson.Thu,
    cafeteriaMenuJson.Fri,
    cafeteriaMenuJson.Sat,
  ];
  const TodaysMenus = DAYOFWEEK[Number(day)];
  if (Number(day) === 0 || Number(day) === 6) {
    cafeteriaMenuLunch.innerHTML = "Weekend";
    cafeteriaMenuDinner.style = "display:none";
  } else {
    cafeteriaMenuLunch.innerHTML = `점심 : ${TodaysMenus.lunch}`;
    cafeteriaMenuDinner.innerHTML = `저녁 : ${TodaysMenus.dinner}`;
  }

  // option-time
  currentTime.innerText = `${hours}:${minutes}:${seconds}`;
}

// option-todayWeather
const API_KEY = "a9974607ee11f242946f6b7e6701d188";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      todayWeather.innerHTML = `${data.weather[0].main.toUpperCase()} | ${
        data.main.temp
      }°C | ${data.main.humidity}%`;
    });
}

function onGeoError() {
  todayWeather.innerHTML = "Please check your permissions";
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// titleCover.addEventListener("onload", siteStartAnimation);
getTime();
setInterval(getTime, 1000);
