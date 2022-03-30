const bodyEl = document.querySelector("body");
const bodyBoxSideMenu = document.querySelector("#bodyBox-sideMenuJS");
const sideBarBlank = document.querySelector("#sideBar__blankJS");
const closeSideBarIcon = document.querySelector("#closeSideBarJS");
const btnMenu = document.querySelector(".btn-menu");
const optionHamburge = document.querySelector("#option-hamburgerJS");
const movePageBox = document.querySelectorAll(".movePageBox");

function sideBar__open() {
  bodyBoxSideMenu.classList.add("sideBar");
  closeSideBarIcon.classList.remove("hidden");
  btnMenu.classList.add("sideBar__btn-menu");
  btnMenu.classList.remove("checked");
  btnMenu.classList.add("checked");
  optionHamburge.classList.remove("hidden");
}

function sideBar__close() {
  bodyBoxSideMenu.classList.remove("sideBar");
  closeSideBarIcon.classList.add("hidden");
  optionHamburge.classList.add("hidden");
}

function closeSideBarIcon__over() {
  closeSideBarIcon.style.transform = "translateX(40%)";
  closeSideBarIcon.style.color = "#e97388";
}

function closeSideBarIcon__out() {
  closeSideBarIcon.style.transform = "translateX(0%)";
  closeSideBarIcon.style.color = "#f5f5f5";
}

btnMenu.addEventListener("click", sideBar__open);
sideBarBlank.addEventListener("click", sideBar__close);
sideBarBlank.addEventListener("mouseover", closeSideBarIcon__over);
sideBarBlank.addEventListener("mouseout", closeSideBarIcon__out);
