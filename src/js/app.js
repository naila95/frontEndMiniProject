window.addEventListener("DOMContentLoaded", function () {
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
  let itemList = [];

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

  // FILTER

  // function filterCategories() {
  //   let category = document.querySelector(".items-category");
  //   let filterHtml = "";
  //   let categoryTypes = ["All"];
  // }

  // FETCH

  const getItems = () => {
    fetch("db.json")
      .then((res) => res.json())
      .then((item) => (itemList = item));
  };

  getItems();

  const elementCreating = () => {
    console.log("hii");
  };

  let name= "naile";

  

  // const createElement = () => {
  //   let html = "";
  //   itemList.forEach((product) => {
  //     html += `
  //     <div class="col-md-6 col-lg-3 col-sm-12">
  //         <div class="item">
  //           <span></span>
  //           <img class="img-fluid" src="${product.image}" />
  //           <div class="item-content">
  //             <a class="item-name" href="">${product.name}</a>
  //             <p class="item-price">$${product.price}</p>
  //             <a class="addToCart" href="#">Add to cart</a>
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //   });
  //   document.querySelector(".items-main").innerHTML = html;
  // };

  // setTimeout(() => {
  //   createHtmlEl();
  // }, 100);
});
