// resp menu
let menu = document.querySelector(".menu");
let hamburgerBtn = document.querySelector(".resp-menu");
// let header = document.querySelector("header");
// let body = document.querySelector(".body");

hamburgerBtn.addEventListener("click", function () {
  menu.classList.toggle("open");
  if (menu.classList.contains("open")) {
    menu.style.height = menu.scrollHeight + "px";
  } else {
    menu.style.height = "0";
  }
});

// scroll
// document.addEventListener("DOMContentLoaded", function () {
//   const navFields = document.querySelectorAll(".nav-field");

//   window.addEventListener("scroll", function () {
//     const currentPosition = window.scrollY + 70;

//     navFields.forEach(function (navField) {
//       const target = document.querySelector(navField.getAttribute("href"));
//       const targetPosition = target.offsetTop; // Returns the distance from the outer boundary of the current element relative to the inner top edge of its parent
//       const targetHeight = target.offsetHeight; // Returns the height of the element

//       if (
//         currentPosition >= targetPosition &&
//         currentPosition < targetPosition + targetHeight
//       ) {
//         navField.classList.add("menu-active");
//       } else {
//         navField.classList.remove("menu-active");
//       }
//     });
//   });
// });

const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target.classList.add("menu-active");
  });
});

// year in footer
const year = document.getElementById("copyright-year");
let currentYear = new Date().getFullYear();
year.innerHTML = currentYear;
// year.innerHTML = `${new Date().getFullYear()}`;

//fetch and filtering
const newsContainer = document.querySelector(".news-container");
const btnLeft = document.querySelector(".back-btn");
const btnRight = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
const filterBtns = document.querySelectorAll(".projects-filter");

const itemsPerPage = 4;
let currentPage = 1;
let newsItems = [];
const totalDots = 5;
let fetchedData = [];

async function fetchNewsItems() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    fetchedData = await response.json();
    newsItems = fetchedData.map((item) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      img: item.thumbnailUrl,
    }));

    displayNewsItems(newsItems);
  } catch (error) {
    console.log("Error fetching news items:", error);
  }
}

function displayNewsItems(items) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  let displayNews = displayedItems.map(function (item) {
    return `
    <div class="news">
      <div class="news-image">
        <img src="https://placehold.co/300x200" alt="${item.title}" />
      </div>
      <div class="news-info">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    </div>`;
  });

  newsContainer.innerHTML = displayNews.join("");
}

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const category = e.currentTarget.dataset.id;
    const projectCategory = fetchedData.filter(
      (project) => project.userId == category
    );

    if (category === "all") {
      displayNewsItems(fetchedData);
    } else {
      displayNewsItems(projectCategory);
    }

    updateActiveFilter(btn);
  });
});

function updateActiveFilter(clickedBtn) {
  filterBtns.forEach((btn) => {
    if (btn === clickedBtn) {
      btn.classList.add("projects-filter-active");
    } else {
      btn.classList.remove("projects-filter-active");
    }
  });
}

function updateActiveDot() {
  dots.forEach((dot, index) => {
    if (index === currentPage - 1) {
      dot.classList.add("projects-dots-active");
    } else {
      dot.classList.remove("projects-dots-active");
    }
  });
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayNewsItems(newsItems);
    updateActiveDot();
  }
}

function goToNextPage() {
  const totalPages = 5;
  if (currentPage < totalPages && currentPage < 5) {
    currentPage++;
    displayNewsItems(newsItems);
    updateActiveDot();
  }
}

btnLeft.addEventListener("click", goToPreviousPage);
btnRight.addEventListener("click", goToNextPage);

fetchNewsItems();
