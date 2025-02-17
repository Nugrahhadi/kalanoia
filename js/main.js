document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Function to set active navigation based on current page
  const setActiveNavByPage = () => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.remove("active");

      // Set active based on current page
      if (currentPage === "index.html" && href === "#lounge") {
        link.classList.add("active");
      } else if (currentPage === "menu.html" && href === "#menu") {
        link.classList.add("active");
      } else if (currentPage === "contact.html" && href === "#contact") {
        link.classList.add("active");
      }
    });
  };

  const setActiveNavByScroll = () => {
    if (currentPage !== "index.html") return;

    const sections = document.querySelectorAll("section");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  setActiveNavByPage();

  if (currentPage === "index.html") {
    window.addEventListener("scroll", setActiveNavByScroll);
  }

  // Hamburger menu functionality
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (currentPage === "index.html" && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      }
    });
  });
});
