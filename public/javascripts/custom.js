const bodyEl = document.querySelector("body");
const bodyBoxSideMenu = bodyEl.querySelector("#bodyBox-sideMenuJS");
const sideBarBlank = bodyBoxSideMenu.querySelector("#sideBar__blankJS");
const closeSideBarIcon = sideBarBlank.querySelector("#closeSideBarJS");
const btnMenu = bodyBoxSideMenu.querySelector(".btn-menu");
const optionHamburge = bodyBoxSideMenu.querySelector("#option-hamburgerJS");
const movePageBox = optionHamburge.querySelectorAll(".movePageBox");
const optionsBoxs = bodyEl.querySelectorAll(".customOption-options__box");
const customOptionOptionsText = bodyEl.querySelectorAll(
  ".customOption-options__text"
);
const optionBtns = bodyEl.querySelectorAll(".customOption-options__button");
const optionBtnTexts = bodyEl.querySelectorAll(
  ".customOption-options__button__text"
);
const enterBtn = document.querySelector("#enterBtn");

let checkedOption;

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

if (getCookie("customOption")) {
  const checkedOption = getCookie("customOption");
  optionBtns.forEach(btn => {
    if (btn.previousSibling.previousSibling.innerHTML === checkedOption) {
      btn.classList.add("checked");
      btn.firstChild.innerHTML = "unuse";
    }
  });
}

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
function textDecorating() {
  const TEXTWIDTH = this.firstChild.offsetWidth;
  this.firstChild.nextSibling.nextSibling.style.width = TEXTWIDTH + "px";
}
function textDecreasing() {
  this.firstChild.nextSibling.nextSibling.style.width = "0px";
}
function clickingBtn() {
  if (this.className.indexOf("checked") === -1) {
    optionBtns.forEach(btn => {
      btn.classList.remove("checked");
      btn.firstChild.innerHTML = "use";
    });
    this.classList.add("checked");
    this.firstChild.innerHTML = "unuse";
    checkedOption = this.previousSibling.previousSibling.innerHTML;
    console.log(checkedOption);
  } else {
    this.classList.remove("checked");
    this.firstChild.innerHTML = "use";
    checkedOption = "";
    console.log(checkedOption);
  }
}
function sendCookie() {
  customOptionOptionsText.forEach(El => {
    if (El.nextSibling.innerHTML === checkedOption) {
      const value = El.nextSibling.innerHTML;
      console.log(value);
      document.cookie = `customOption=${value};`;
    } else if (checkedOption === "") {
      document.cookie = `customOption=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
  });
  notyfSuccess.open({
    type: "success",
    message: "적용되었습니다",
  });
}

btnMenu.addEventListener("click", sideBar__open);
sideBarBlank.addEventListener("click", sideBar__close);
sideBarBlank.addEventListener("mouseover", closeSideBarIcon__over);
sideBarBlank.addEventListener("mouseout", closeSideBarIcon__out);
optionsBoxs.forEach(boxEl => {
  boxEl.addEventListener("mouseover", textDecorating);
  boxEl.addEventListener("mouseout", textDecreasing);
});
optionBtns.forEach(Btn => {
  Btn.addEventListener("click", clickingBtn);
});
enterBtn.addEventListener("click", sendCookie);
