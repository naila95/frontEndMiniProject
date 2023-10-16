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
let basket = JSON.parse(localStorage.getItem("basket"));
let html = "";

if (localStorage.getItem("basket") === null) {
  localStorage.setItem("basket", JSON.stringify([]));
}

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

// PHONE

phoneDropIcon.addEventListener("click", function () {
  phoneDropdown.classList.toggle("visible");
});

// WELCOME PAGE

welcomeOpen.addEventListener("click", function (e) {
  e.preventDefault();
  welcomePage.classList.add("show");
});

welcomeClose.addEventListener("click", function () {
  welcomePage.classList.remove("show");
});

// FETCH

fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    let html = "";
    data.products.forEach((product) => {
      html += `
      <div class="col-md-6 col-lg-3 col-sm-12">
      <div class="item">
        <span></span>
        <img class="img-fluid" src="${product.image}" />
        <div class="item-content">
          <a class="item-name" href="">${product.name}</a>
          <p class="item-price">$${product.price}</p>
          <a class="addToCart" href="#" data-price="${product.price}" data-id="${product.id}">Add to cart</a>
        </div>
      </div>
    </div>
        `;
    });
    document.querySelector(".items-main").innerHTML = html;

    // ADD TO BASKET

    let addBasket = document.querySelectorAll(".addToCart");
    addBasket.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (localStorage.getItem("basket") === null) {
          localStorage.setItem("basket", JSON.stringify([]));
        }
        let data_id = e.target.getAttribute("data-id");
        let data_price = e.target.getAttribute("data-price");
        let exist = basket.find((p) => (p.id = data_id));

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
      });
    });
    console.log(basket);
  });

// FILTER

// function createCategories() {
//   let category = document.querySelector(".items-category");
//   let filterHtml = "";
//   let categoryTypes = ["All"];
//   data.products.forEach((product) => {
//     if (categoryTypes.findIndex((filter) => (filter = category.type)) == -1)
//       categoryTypes.push(product.category);
//   });

//   categoryTypes.forEach((category) => {
//     filterHtml += `
//     <a class="active">${category}</a>
//     `;
//   });

//   category.innerHTML = filterHtml;
// }

// let itemList = [];

// const getItems = () => {
//   fetch("db.json")
//     .then((res) => res.json())
//     .then((item) => (itemList = item));
// };

// getItems();

// const createElement = () => {
//   let html = "";
//   itemList.forEach((product) => {
//     html += `
// <div class="col-md-6 col-lg-3 col-sm-12">
//     <div class="item">
//       <span></span>
//       <img class="img-fluid" src="${product.image}" />
//       <div class="item-content">
//         <a class="item-name" href="">${product.name}</a>
//         <p class="item-price">$${product.price}</p>
//         <a class="addToCart" href="#">Add to cart</a>
//       </div>
//     </div>
//   </div>
//       `;
//   });
//   document.querySelector(".items-main").innerHTML = html;
// };
// createElement();
