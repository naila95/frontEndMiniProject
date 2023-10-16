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

fetch("db.json")
  .then((rest) => rest.json())
  .then((data) => {
    let html = "";
    basket.forEach((item) => {
      let element = data.products.find((a) => {
        return a.id == item.id;
      });
      html += `
      <div class="row">
      <div class="col-lg-6">
        <div class="cart-items-left row">
          <div class="col-lg-1">
            <i style="color: #929292" class="fa-solid fa-xmark"></i>
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
            <span class="onePrice">$${element.price}</span>
          </div>
          <div class="col-lg-8">
            <div class="cart-count">
              <i
                style="color: #929292"
                class="fa-solid fa-caret-left"
              ></i>
              <span class="cart-number">0</span>
              <i
                style="color: #929292"
                class="fa-solid fa-caret-right"
              ></i>
            </div>
          </div>
          <div class="col-lg-2">
            <span class="second-price">$45</span>
          </div>
        </div>
      </div>
    </div>

        `;
    });
    document.querySelector(".cart-items").innerHTML = html;
  });

if (localStorage.getItem("basket") === null) {
  localStorage.setItem("basket", JSON.stringify([]));
  prodPrice.textContent = "0";
  prodCount.textContent = "0";
} else {
  let price = 0;
  basket.forEach((item) => {
    price += item.price * item.count;
  });
  prodPrice.innerText = price.toFixed(2);
  prodCount.innerText = basket.length;
}
