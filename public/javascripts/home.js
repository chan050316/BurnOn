const titleBoxTitle = document.querySelectorAll(".titleBox_titleJS");

const cookie = document.cookie;
const customOption = cookie.substr(cookie.indexOf("=") + 1, cookie.length);

if (customOption) {
  titleBoxTitle[2].innerHTML = customOption;
} else {
  console.log("it's not cookie!");
}
