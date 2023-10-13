// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
const form = document.querySelector("#search");
form.addEventListener("submit", setQuery);

async function setQuery(e) {
  e.preventDefault();
  const searchInput = document.querySelector("#searchInput").value;

  const display = document.querySelector("#results");
  display.innerHTML = "";

  const spinner = document.querySelector(".spinner2");
  spinner.classList.remove("hidden");

  try {
    const results = await searchWikipedia(searchInput);
    displayResults(results);
  } catch (err) {
    console.log(err);
    alert("Failed to search wikipedia");
  } finally {
    spinner.classList.add("hidden");
  }
}

async function searchWikipedia(searchInput) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = response.json();
  return json;
}

function displayResults(results) {
  const display = document.querySelector("#results");

  results.query.search.forEach((result) => {
    const url = `https://en.wikipedia.org/??curid=${result.pageid}`;

    display.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
        <h3 class="title">
          <a href="${url}" target="_blank" rel="noopener">
            ${result.title}
          </a>
        </h3>
        <a href="${url}" class="link" target="_blank" rel="noopener">
          ${url}
        </a>
        <span class="snippet">${result.snippet}</span><br>
      </div>`
    );
  });
}
