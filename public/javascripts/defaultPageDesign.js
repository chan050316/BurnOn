const bodyEl = document.querySelector("body");
const bodyBoxSideMenu = document.querySelector("#bodyBox-sideMenuJS");
const sideBarBlank = document.querySelector("#sideBar__blankJS");
const closeSideBarIcon = document.querySelector("#closeSideBarJS");
const btnMenu = document.querySelectorAll(".btn-menu");
const optionHamburge = document.querySelector("#option-hamburgerJS");
const optionMusic = document.querySelector("#option-musicJS");
const optionAlarm = document.querySelector("#option-alarmJS");

const options = [optionHamburge, optionMusic, optionAlarm];

function sideBar__open() {
  bodyBoxSideMenu.classList.add("sideBar");
  closeSideBarIcon.classList.remove("hidden");
  btnMenu.forEach(div => {
    div.classList.add("sideBar__btn-menu");
    div.classList.remove("checked");
  });
  this.classList.toggle("checked");
  if (this.childNodes[0].className.indexOf("icon-hamburger") === 0) {
    options.forEach(El => {
      if (El.className.indexOf("hamburger") === -1) {
        El.classList.add("hidden");
      } else {
        El.classList.remove("hidden");
      }
    });
  } else if (this.childNodes[0].className.indexOf("icon-music") === 0) {
    options.forEach(El => {
      if (El.className.indexOf("music") === -1) {
        El.classList.add("hidden");
      } else {
        El.classList.remove("hidden");
      }
    });
  } else if (this.childNodes[0].className.indexOf("icon-alarm") === 0) {
    options.forEach(El => {
      if (El.className.indexOf("alarm") === -1) {
        El.classList.add("hidden");
      } else {
        El.classList.remove("hidden");
      }
    });
  }
}

function sideBar__close() {
  bodyBoxSideMenu.classList.remove("sideBar");
  closeSideBarIcon.classList.add("hidden");
  options.forEach(option => {
    option.classList.add("hidden");
  });
}

function closeSideBarIcon__over() {
  closeSideBarIcon.style.transform = "translateX(40%)";
  closeSideBarIcon.style.color = "#e97388";
}

function closeSideBarIcon__out() {
  closeSideBarIcon.style.transform = "translateX(0%)";
  closeSideBarIcon.style.color = "#f5f5f5";
}

btnMenu.forEach(btn => {
  btn.addEventListener("click", sideBar__open);
});
sideBarBlank.addEventListener("click", sideBar__close);
sideBarBlank.addEventListener("mouseover", closeSideBarIcon__over);
sideBarBlank.addEventListener("mouseout", closeSideBarIcon__out);
