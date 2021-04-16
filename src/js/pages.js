document.addEventListener("DOMContentLoaded", function () {
  // NAV INIT
  const sideNav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNav, {
    edge: "right",
  });
  loadNav();
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";

  function loadNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll("#nav, #mobile-nav").forEach(function (elem) {
          elem.innerHTML = xhr.responseText;
        });

        document
          .querySelectorAll("#nav a, #mobile-nav a")
          .forEach(function (elm) {
            if (elm.getAttribute("href").substr(1) == page) {
              elm.classList.add("active-nav");
            }

            elm.addEventListener("click", function (e) {
              const page = e.target.getAttribute("href").substr(1);
              document
                .querySelectorAll("#nav a, #mobile-nav a")
                .forEach(function (elm) {
                  elm.classList.remove("active-nav");
                });
              e.target.classList.add("active-nav");
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              loadPage(page);
            });
          });
      }
    };

    xhr.open("GET", "/src/pages/nav.html", true);
    xhr.send();
  }

  // PAGE

  loadPage(page);

  function loadPage(page) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector("#content");
        if (this.status == 200) {
          content.innerHTML = xhr.responseText;
        } else {
          content.innerHTML = "<p>opss.. something wrong</p>";
        }
      }
    };

    xhr.open("GET", `/src/pages/${page}.html`, true);
    xhr.send();
  }
});
