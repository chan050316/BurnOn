const titleCover = document.querySelector("#titleCoverJS");
const titleBoxTitle = document.querySelectorAll(".titleBox_titleJS");
const customForm = document.querySelector("#customForm");

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

// titleCover.addEventListener("onload", siteStartAnimation);
