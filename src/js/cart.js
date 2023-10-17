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
let prodPrice = document.querySelector(".onePrice");
let prodCount = document.querySelector(".cart-number");
let basket = JSON.parse(localStorage.getItem("basket"));
let total = document.querySelector(".total h3");
let cartCount = document.querySelector(".cart-count-item");

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

// FETCH

dataList = "";

const getItemsCart = () => {
  fetch("db.json")
    .then((rest) => rest.json())
    .then((data) => (dataList = data));
};

getItemsCart();

const createElementCartHtml = () => {
  let html = "";
  basket.forEach((item) => {
    let element = dataList.find((a) => a.id == item.id);
    html += `
      <div class="row mb-3">
      <div class="col-lg-6">
        <div class="cart-items-left row">
          <div class="col-lg-1">
            <i style="color: #929292" class="fa-solid fa-xmark delete-icon" onclick="removeItem(${
              element.id
            })"></i>
          </div>
          <div class="col-lg-4">
            <img
              class="img-fluid"
              src="${element.image}"
            />
          </div>
          <div class="col-lg-7 product-name">
            <p>${element.name}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="row cart-items-right">
          <div class="col-lg-2">
            <span class="onePrice">$${item.price}</span>
          </div>
          <div class="col-lg-8">
            <div class="cart-count">
              <i data-id=${element.id}
              data-count=${item.count}
              onclick="decreaseItem(${element.id})"
                style="color: #929292"
                class="fa-solid fa-caret-left prev-btn-cart"
              ></i>
              <span class="cart-number">${item.count}</span>
              <i data-id=${element.id}
              data-count=${item.count}
                style="color: #929292"
                onclick="increaseItem(${element.id})"
                class="fa-solid fa-caret-right next-btn-cart"
              ></i>
            </div>
          </div>
          <div class="col-lg-2">
            <span class="second-price">$${item.price * item.count}</span>
          </div>
        </div>
      </div>
    </div>
        `;
  });
  document.querySelector(".cart-items").innerHTML = html;
};

setTimeout(() => {
  createElementCartHtml();
}, 100);

// REMOVE ITEM

const removeItem = (itemId) => {
  let clickedIcon = basket.find((i) => i.id == itemId);
  basket.splice(clickedIcon, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  getItemsCart();
  createElementCartHtml();
};

// INCREASE, DECREASE ITEMS

const decreaseItem = (itemId) => {
  let clickedIcon = basket.find((i) => i.id == itemId);
  if (clickedIcon.count != 1) {
    clickedIcon.count--;
  } else {
    removeItem();
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  getItemsCart();
  createElementCartHtml();
};

const increaseItem = (itemId) => {
  let clickedIcon = basket.find((i) => i.id == itemId);
  clickedIcon.count++;
  localStorage.setItem("basket", JSON.stringify(basket));
  getItemsCart();
  createElementCartHtml();
};

//   // TOTAL

const grandTotal = (arr) => {
  return arr.reduce((sum, i) => {
    return sum + i.price * i.count;
  }, 0);
};

total.innerText = grandTotal(basket) + "$";
cartCount.innerText = "(" + basket.length + ")";
