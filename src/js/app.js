window.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".tabs div");
  let contents = document.querySelectorAll(".content .content-head");

  for (let tab of tabs) {
    tab.addEventListener("click", function () {
      let activeElement = document.querySelector(".active");
      activeElement.classList.remove("active");
      this.classList.add("active");

      let index = this.getAttribute("data-index");
      console.log(index);
      for (let content of contents) {
        if (content.getAttribute("data-index") == index) {
          content.classList.add("show");
        } else {
          content.classList.remove("show");
        }
      }
    });
  }
});
