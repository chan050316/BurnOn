const bodyBoxSideMenu = document.querySelector("#bodyBox-sideMenuJS");
const closeSideBar = document.querySelector("#closeSideBarJS");
const btnPlay = document.querySelector("#btn-playJS");
const iconPlay = document.querySelector("#icon-playJS");
const btnMenu = document.querySelectorAll(".btn-menu");

function playingMusic() {
  if (iconPlay.className === "material-icons icon-pause icon-play") {
    iconPlay.innerHTML = "&#xe034;";
  } else {
    iconPlay.innerHTML = "&#xe037;";
  }
  iconPlay.classList.toggle("icon-play");
}

function sideBar__open() {
  bodyBoxSideMenu.classList.add("sideBar");
  closeSideBar.classList.remove("hidden");
  btnMenu.forEach(div => {
    div.classList.add("sideBar__btn-menu");
    div.classList.remove("checked");
  });
  this.classList.toggle("checked");
  if (this.childNodes[0].className.indexOf("icon-hamburger") === 0) {
    console.log(1);
  } else if (this.childNodes[0].className.indexOf("icon-music") === 0) {
    console.log(2);
  } else if (this.childNodes[0].className.indexOf("icon-volume") === 0) {
    console.log(3);
  }
}

function sideBar__close() {
  bodyBoxSideMenu.classList.remove("sideBar");
  closeSideBar.classList.add("hidden");
}

btnPlay.addEventListener("click", playingMusic);
btnMenu.forEach(btn => {
  btn.addEventListener("click", sideBar__open);
});
closeSideBar.addEventListener("click", sideBar__close);
