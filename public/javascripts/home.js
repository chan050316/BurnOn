const titleCover = document.querySelector("#titleCoverJS");
const titleBoxTitle = document.querySelectorAll(".titleBox_titleJS");
const customForm = document.querySelector("#customForm");
const currentTime = document.querySelector("#currentTimeJS");
const schedule = document.querySelector("#scheduleJS");
const cafeteriaMenu = document.querySelector("#cafeteriaMenuJS");
const cafeteriaMenuLunch = document.querySelector("#cafeteriaMenuJS__lunch");
const cafeteriaMenuDinner = document.querySelector("#cafeteriaMenuJS__dinner");

const cookie = document.cookie;
const customOption = cookie.substr(cookie.indexOf("=") + 1, cookie.length);
const countDownName = "2차 피드백";
const countDownDate = new Date("June 22, 2022 00:00:00").getTime();
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

  // option-time
  currentTime.innerText = `${hours}:${minutes}:${seconds}`;

  // option-showSchedule
  const distance = countDownDate - date;
  const Dday = Math.floor(distance / (1000 * 60 * 60 * 24));
  schedule.innerHTML = `${countDownName} D-${Dday}`;

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
  console.log(DAYOFWEEK[Number(day)]);
  if (Number(day) === 0 || Number(day) === 6) {
    cafeteriaMenuLunch.innerHTML = "Weekend";
  } else {
    cafeteriaMenuLunch.innerHTML = `아침 : ${TodaysMenus.lunch}`;
    cafeteriaMenuDinner.innerHTML = `점심 : ${TodaysMenus.dinner}`;
  }
}

// titleCover.addEventListener("onload", siteStartAnimation);
getTime();
setInterval(getTime, 1000);
