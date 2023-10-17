let tabs = document.querySelectorAll(".tabs div");
let contents = document.querySelectorAll(".content .content-head");
let searchIcon = document.querySelector(".search-icon");
let searchInp = document.querySelector(".search-inp");
let welcomePage = document.querySelector("#welcome-page");
let welcomeClose = document.querySelector(".welcome-close-icon");
let welcomeOpen = document.querySelector(".welcome-open-icon");
let openFormBtn = document.querySelector(".login-link");
let formContainer = document.querySelector(".form-container");
let formCloseBtn = document.querySelector(".form-close");
let tabsAbout = document.querySelectorAll(".tabs-about div");
let contentAbout = document.querySelectorAll(".about-content div");
let cartCount = document.querySelector(".cart-count-item");
let basket = JSON.parse(localStorage.getItem("basket"));

// WELCOME PAGE

welcomeOpen.addEventListener("click", function (e) {
  e.preventDefault();
  welcomePage.classList.add("show");
});

welcomeClose.addEventListener("click", function () {
  welcomePage.classList.remove("show");
});

// SEARCH

searchIcon.addEventListener("click", function (e) {
  e.preventDefault();
  searchInp.classList.toggle("show");
});

// FORM

openFormBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.add("show");
});

formCloseBtn.addEventListener("click", function () {
  formContainer.classList.remove("show");
});

for (let tab of tabs) {
  tab.addEventListener("click", function () {
    let activeElement = document.querySelector(".active");
    activeElement.classList.remove("active");
    this.classList.add("active");

    let index = this.getAttribute("data-index");
    for (let content of contents) {
      if (content.getAttribute("data-index") == index) {
        content.classList.add("show");
      } else {
        content.classList.remove("show");
      }
    }
  });
}

for (let tab of tabsAbout) {
  tab.addEventListener("click", function () {
    let activeElement = document.querySelector(".active-about");
    activeElement.classList.remove("active-about");
    this.classList.add("active-about");

    let index = this.getAttribute("data-index");
    for (let content of contentAbout) {
      if (content.getAttribute("data-index") == index) {
        content.classList.add("show");
      } else {
        content.classList.remove("show");
      }
    }
  });
}

cartCount.innerText = "(" + basket.length + ")";
