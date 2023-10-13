window.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".tabs div");
  let contents = document.querySelectorAll(".content .content-head");
  let openFormBtn = document.querySelector(".login-link");
  let formContainer = document.querySelector(".form-container");
  let formCloseBtn = document.querySelector(".form-close");
  let body = document.querySelector("body");

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

  // FETCH

  fetch("db.json")
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      data.products.forEach((product) => {
        html += `
        <div class="col-md-3">
            <div class="item">
              <span></span>
              <img class="img-fluid" src="${product.image}" />
              <div class="item-content">
                <a class="item-name" href="">${product.name}</a>
                <p class="item-price">$${product.price}</p>
                <a class="addToCart" href="#">Add to cart</a>
              </div>
            </div>
          </div>
        `;
      });

      document.querySelector(".items-main").innerHTML = html;
    });
});
