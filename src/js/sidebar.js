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
let sidebarItems = document.querySelector(".sidebar-items");

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

// FETCH

let sidebarList = [];

const getSidebarItems = () => {
  fetch("sidebar.json")
    .then((rest) => rest.json())
    .then((items) => (sidebarList = items));
};

getSidebarItems();

const createSidebarHtml = () => {
  let sidebarHtml = "";
  sidebarList.forEach((item) => {
    sidebarHtml += `
                <div class="col-lg-3 mb-3">
                  <div class="slidebar-item">
                    <img
                      class="img-fluid"
                      src="${item.image}"
                      alt=""
                    />
                    <div class="text-center">
                      <h6 class="sidebar-item-name">${item.name}</h6>
                      <div class="rate mb-2">
                        <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                        <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                        <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                        <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                        <i
                          style="color: #ebbc00"
                          class="fa-regular fa-star"
                        ></i>
                      </div>
                      <h6 class="sidebar-item-price">${item.price}$</h6>
                    </div>
                  </div>
                </div>
    `;
  });
  sidebarItems.innerHTML = sidebarHtml;
};

setTimeout(() => {
  createSidebarHtml();
  createFilters();
  createMaterialFilter();
}, 100);

// FILTER COLOR

const createFilters = () => {
  const filterColor = document.querySelector(".color");
  let filterColorHtml = "";
  let colorTypes = ["Black", "White", "Rose", "Grey", "Brown"];
  sidebarList.forEach((elem) => {
    if (colorTypes.findIndex((color) => color == elem.color) == 1)
      colorTypes.push(elem.color);
  });

  colorTypes.forEach((type) => {
    filterColorHtml += `
    <a href="" onclick= "filterColors(this)" data-color=${type}>${type}</a>
    `;
  });
  filterColor.innerHTML = filterColorHtml;
  document.querySelectorAll(".color a").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
};

const filterColors = (colorTypes) => {
  let colors = colorTypes.dataset.color;
  getSidebarItems();
  sidebarList = sidebarList.filter((item) => {
    return item.color.toLowerCase() == colors.toLowerCase();
  });
  let sidebarHtml = "";
  sidebarList.forEach((item) => {
    sidebarHtml += `
                    <div class="col-lg-3 mb-3">
                      <div class="slidebar-item">
                        <img
                          class="img-fluid"
                          src="${item.image}"
                          alt=""
                        />
                        <div class="text-center">
                          <h6 class="sidebar-item-name">${item.name}</h6>
                          <div class="rate mb-2">
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i
                              style="color: #ebbc00"
                              class="fa-regular fa-star"
                            ></i>
                          </div>
                          <h6 class="sidebar-item-price">${item.price}$</h6>
                        </div>
                      </div>
                    </div>
        `;
  });
  sidebarItems.innerHTML = sidebarHtml;
  createFilters();
};

// FILTER MATERIAL

const createMaterialFilter = () => {
  const filterMaterial = document.querySelector(".material");
  let filterMaterialHtml = "";
  let materialTypes = ["Wood", "Concrete", "Metal"];
  sidebarList.forEach((elem) => {
    if (materialTypes.findIndex((material) => material == elem.material) == 1)
      materialTypes.push(elem.material);
  });

  materialTypes.forEach((type) => {
    filterMaterialHtml += `
    <a href="" onclick= "sortMaterials(this)" data-material=${type}>${type}</a>
    `;
  });
  filterMaterial.innerHTML = filterMaterialHtml;
  document.querySelectorAll(".material a").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
};

const sortMaterials = (material) => {
  let materials = material.dataset.material;
  getSidebarItems();
  sidebarList = sidebarList.filter((item) => {
    return item.material.toLowerCase() == materials.toLowerCase();
  });
  let sidebarHtml = "";
  sidebarList.forEach((item) => {
    sidebarHtml += `
                    <div class="col-lg-3 mb-3">
                      <div class="slidebar-item">
                        <img
                          class="img-fluid"
                          src="${item.image}"
                          alt=""
                        />
                        <div class="text-center">
                          <h6 class="sidebar-item-name">${item.name}</h6>
                          <div class="rate mb-2">
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i style="color: #ebbc00" class="fa-solid fa-star"></i>
                            <i
                              style="color: #ebbc00"
                              class="fa-regular fa-star"
                            ></i>
                          </div>
                          <h6 class="sidebar-item-price">${item.price}$</h6>
                        </div>
                      </div>
                    </div>
        `;
  });
  sidebarItems.innerHTML = sidebarHtml;
  createFilters();
};
