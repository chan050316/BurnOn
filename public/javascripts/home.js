const titleCover = document.querySelector("#titleCoverJS");
const titleBoxTitle = document.querySelectorAll(".titleBox_titleJS");
const customForm = document.querySelector("#customForm");
const currentTime = document.querySelector("#currentTimeJS");

const cookie = document.cookie;
const customOption = cookie.substr(cookie.indexOf("=") + 1, cookie.length);

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
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // option-time
  currentTime.innerText = `${hours}:${minutes}:${seconds}`;

  // option-showSchedule
  console.dir(date);
}

// titleCover.addEventListener("onload", siteStartAnimation);
getTime();
setInterval(getTime, 1000);
