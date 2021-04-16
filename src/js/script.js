document.addEventListener("scroll", function () {
  const pos = window.pageYOffset;
  const nav = document.querySelector("nav");
  if (pos > 100) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
});
