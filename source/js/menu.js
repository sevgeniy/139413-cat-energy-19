let menuBtn = document.querySelector(".js-toggle");
let menu = document.querySelector(".js-main-nav");

menuBtn.classList.remove("page-header__toggle--no-js");
menu.classList.remove("main-nav--no-js");

menuBtn.addEventListener("click", onMenuBtnClick);

function onMenuBtnClick() {
  let menuIsOpen = menuBtn.classList.contains("page-header__toggle--opened");

  if (menuIsOpen) {
    menuBtn.classList.remove("page-header__toggle--opened");
    menuBtn.classList.add("page-header__toggle--closed");

    menu.classList.add("main-nav--closed");
  } else {
    menuBtn.classList.add("page-header__toggle--opened");
    menuBtn.classList.remove("page-header__toggle--closed");

    menu.classList.remove("main-nav--closed");
  }
}
