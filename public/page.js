const body = document.body;
const screenMode = document.getElementById("bg-mode");
const searchSection = document.querySelector(".search-section");
const searchButton = document.getElementById("search-button");
const h1El = document.querySelector("h1");
const formEl = document.querySelector("form");
const userInput = document.getElementById("user-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

//initialize inputData
let inputData = "";
let page = 1;

screenMode.addEventListener("click", () => {
  body.classList.toggle("alt");
  searchSection.classList.toggle("alt");
  h1El.classList.toggle("alt-h1");
  searchButton.classList.toggle("alt");
  searchResults.classList.toggle("alt");

  if (screenMode.innerHTML === '<i class="fa-solid fa-moon"></i>') {
    // If it's the moon icon, change it to something else (e.g., sun)
    screenMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    // If it's not the moon icon, change it back to the moon
    screenMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
    //bgModeButton.classList.toggle("alt");
  }
});

async function searchImages() {
  //set inputData = userInput
  inputData = userInput.value;
  //dynamic $ //&client_id=${accessKey}
  const url = `/search?query=${inputData}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    const results = data.hits;

    results.map((result) => {
      /*search result div*/
      const resultCard = document.createElement("div");
      resultCard.classList.add("search-result");

      /*image */
      const image = document.createElement("img");
      image.src = result.recipe.image;
      image.alt = result.recipe.label;

      const imageLink = document.createElement("a");
      imageLink.href = result.recipe.url;
      imageLink.target = "_blank";

      const imageTitle = document.createElement("p");
      imageTitle.innerHTML = `
      ${result.recipe.label}<br>
      Calories: ${result.recipe.calories.toFixed(2)}`;
      //imageLink.textContent =

      imageLink.appendChild(image);
      imageLink.appendChild(imageTitle);

      resultCard.appendChild(imageLink);

      /* resultCard.appendChild(image);*/
      searchResults.appendChild(resultCard);
    });

    page++;

    if (results.length === 0 && page > 1) {
      // if result not found, hide showmore btn
      showMoreButton.style.display = "none";
      // Print a message that no images were found
      searchResults.innerHTML = `No images found for '${inputData}'`;
      searchResults.style.justifyContent = "center";
    } else if (page > 1) {
      showMoreButton.style.display = "block";
      searchResults.style.justifyContent = "space-between";
    }
  } catch (error) {
    console.log(error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault(); //prevent refresh when submit the form
  page = 1;
  if (userInput.value === "") {
    alert("Search Image need Input");
  } else {
    searchImages();
  }
});

showMoreButton.addEventListener("click", searchImages);
