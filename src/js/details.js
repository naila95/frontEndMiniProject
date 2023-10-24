let tabs = document.querySelectorAll(".tabs div");
let contents = document.querySelectorAll(".content .content-head");
let openFormBtn = document.querySelector(".login-link");
let formContainer = document.querySelector(".form-container");
let formCloseBtn = document.querySelector(".form-close");
let body = document.querySelector("body");
let phoneDropIcon = document.querySelector(".phone-drop-icon");
let phoneDropdown = document.querySelector(".category-dropdown");
let searchIcon = document.querySelector(".search-icon");
let searchInp = document.querySelector(".search-inp");
let welcomePage = document.querySelector("#welcome-page");
let welcomeClose = document.querySelector(".welcome-close-icon");
let welcomeOpen = document.querySelector(".welcome-open-icon");
let detailsContent = document.querySelectorAll(".details-content-div");
let detailsTab = document.querySelectorAll(".details-tab-heading");
let basket = JSON.parse(localStorage.getItem("basket"));
let cartCount = document.querySelector(".cart-count-item");
let detailsList = [];

let productDetail = JSON.parse(localStorage.getItem("product-detail"));
fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    detailsList = data;
    let product = detailsList.find((a) => a.id == productDetail);
    document
      .querySelector("#product-detail-image")
      .setAttribute("src", product.image);
    document.querySelector("#product-detail-name").innerText = product.name;
    document.querySelector("#product-detail-price").innerText =
      product.price + "$";

    // ADD TO BASKET
    document
      .querySelector(".add-basket-detail")
      .addEventListener("click", function (e) {
        e.preventDefault();

        if (localStorage.getItem("basket") === null) {
          localStorage.setItem("basket", JSON.stringify([]));
        }

        let data_id = product.id;
        let data_price = product.price;
        let exist = basket.find((p) => p.id == data_id);

        if (exist) {
          exist.count++;
        } else {
          basket.push({
            id: data_id,
            count: 1,
            price: data_price,
          });
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        cartCount.innerText = "(" + basket.length + ")";
      });

    // INCREASE, DECREASE ITEMS

    document
      .querySelector(".detail-decrease-icon")
      .addEventListener("click", function () {
        let clickedIcon = basket.find((i) => i.id == product.id);
        if (clickedIcon.count != 1) {
          clickedIcon.count--;
        }
        document.querySelector(".detail-count").innerText = clickedIcon.count;
        localStorage.setItem("basket", JSON.stringify(basket));
      });

    document
      .querySelector(".detail-increase-icon")
      .addEventListener("click", function () {
        let clickedIcon = basket.find((i) => i.id == product.id);
        clickedIcon.count++;
        document.querySelector(".detail-count").innerText = clickedIcon.count;
        localStorage.setItem("basket", JSON.stringify(basket));
      });
  });

// FORM

openFormBtn.addEventListener("click", function (e) {
  e.preventDefault();
  formContainer.classList.add("show");
  body.classList.add("filter");
});

formCloseBtn.addEventListener("click", function () {
  formContainer.classList.remove("show");
  body.classList.remove("filter");
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

// SEARCH

searchIcon.addEventListener("click", function (e) {
  e.preventDefault();
  searchInp.classList.toggle("show");
});

// WELCOME PAGE

welcomeOpen.addEventListener("click", function (e) {
  e.preventDefault();
  welcomePage.classList.add("show");
});

welcomeClose.addEventListener("click", function () {
  welcomePage.classList.remove("show");
});

for (let element of detailsTab) {
  element.addEventListener("click", function () {
    let activeElement = document.querySelector(".active-details");
    activeElement.classList.remove("active-details");
    this.classList.add("active-details");

    let index = this.getAttribute("data-index");
    for (let content of detailsContent) {
      if (content.getAttribute("data-index") == index) {
        content.classList.add("show");
      } else {
        content.classList.remove("show");
      }
    }
  });
}
