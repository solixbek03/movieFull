var normalizedMovies = movies.map((movie) => {
  return {
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: `https://youtube.com/watch?v=${movie.ytid}`,
    bigPoster: `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    smallPoster: `https://i3.ytimg.com/vi/${movie.ytid}/hqresdefault.jpg`, 
  };
});

let elSearchForm = $(".js-search-form");
let elSearchTitleInput = $(".js-search-form__title-input", elSearchForm);
let elSearchRatingInput = $(".js-search-form__rating-input", elSearchForm);
let elSearchGanreSelect = $(".js-search-form__genre-select", elSearchForm);
let elSearchSortSelect = $(".js-search-form__sort-select", elSearchForm);
let elButton = $(".btn-block-js", elSearchForm);

let elSearchResults = $(".search-results");

let elSearchResultTemplate = $("#search-result-template").content;

let createGenreSelectOptions = () => {
  let moviesCategories = [];

  normalizedMovies.slice(0, 700).forEach(movie => {
    movie.categories.forEach(category => {
      if (!moviesCategories.includes(category)) {
        moviesCategories.push(category);
      }
    })
  })

  moviesCategories.sort();

  let elOptionsFragment = document.createDocumentFragment();

  moviesCategories.forEach(category => {
    let elCategoryOption = createElement("option", "", category);
    elCategoryOption.value = category;

    elOptionsFragment.appendChild(elCategoryOption);
  })

  elSearchGanreSelect.appendChild(elOptionsFragment);
}

createGenreSelectOptions();

let renderResults = (searchResults) => {
  elSearchResults.innerHTML = "";

  let elResultsFragment = document.createDocumentFragment();

  searchResults.forEach(movie => {
    let elMovie = elSearchResultTemplate.cloneNode(true);

    // $(".movie__poster", elMovie).src = movie.bigPoster;
    $(".movie__poster", elMovie).alt = movie.title;
    $(".movie__title", elMovie).textContent = movie.title;
    $(".movie__year", elMovie).textContent = movie.year;
    $(".movie__rating", elMovie).textContent = movie.imdbRating;
    $(".movie__trailer-link", elMovie).href = movie.trailer;
    elResultsFragment.appendChild(elMovie);
  })

  elSearchResults.appendChild(elResultsFragment);
}

renderResults(normalizedMovies.slice(0, 50));

let sortSearchResults = (results, sortType) => {
  if (sortType === "az") {
    results.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
    });
  } else if (sortType === "za") {
    results.sort(function(a, b){
      if(a.title > b.title) { return -1; }
      if(a.title < b.title) { return 1; }
      return 0;
    });
  } else if (sortType === "rating_desc") {
    results.sort(function(a, b){
      if(a.imdbRating > b.imdbRating) { return -1; }
      if(a.imdbRating < b.imdbRating) { return 1; }
      return 0;
    });
  } else if (sortType === "rating_asc") {
    results.sort(function(a, b){
      if(a.imdbRating < b.imdbRating) { return -1; }
      if(a.imdbRating > b.imdbRating) { return 1; }
      return 0;
    });
  } else if (sortType === "year_desc") {
    results.sort(function(a, b){
      if(a.year > b.year) { return -1; }
      if(a.year < b.year) { return 1; }
      return 0;
    });
  } else if (sortType === "year_asc") {
    results.sort(function(a, b){
      if(a.year < b.year) { return -1; }
      if(a.year > b.year) { return 1; }
      return 0;
    });
  }
}

let findMovies = (title, minRating, genre) => {
  return normalizedMovies.filter(movie => {
    let doesMatchCategory = genre === "All" || movie.categories.includes(genre);
    
    return movie.title.match(title) && movie.imdbRating > minRating && doesMatchCategory;
  })
}

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let searchTitle = elSearchTitleInput.value.trim();
  let movieTitleRegex = new RegExp(searchTitle, "gi");

  let minimumRating = Number(elSearchRatingInput.value);
  let genre = elSearchGanreSelect.value;
  let sorting = elSearchSortSelect.value;

  let searchResults = findMovies(movieTitleRegex, minimumRating, genre);
  sortSearchResults(searchResults, sorting);

  renderResults(searchResults);

})

let elResultHistory =$(".js-modal-result");
let historyList = []


elSearchForm.addEventListener('submit', function(evt){
  // historyList.innerHTML = '';
  

  let elinputVall = elSearchTitleInput.value;
  historyList.push(elinputVall);
  console.log(historyList);
  localStorage.setItem('movies', historyList);

  let boom = localStorage.getItem('movies');
  historyList.push(boom)
  
  elResultHistory.textContent = boom
})
// localStorage.setItem('movies', historyList);
console.log(historyList);

let boom = localStorage.getItem('movies');


elResultHistory.textContent = boom

// localStorage.clear()







































































// let createGenreSelectOptions = () => {
//   let moviesCategories = [];
  
//   normalizedMovies.slice(0, 50).forEach((movie) => {
//     movie.categories.forEach((category) => {
//       if (!moviesCategories.includes(category)) {
//         moviesCategories.push(category);
//       }
//     })
//   });

//   moviesCategories.sort();

//   let elOptionsFragment = document.createDocumentFragment();

//   moviesCategories.forEach((category) => {
//     let elCategoryOption = document.createElement("option");
//     elCategoryOption.textContent = category;
//     elCategoryOption.value = category;

//     elOptionsFragment.appendChild(elCategoryOption);
//   })

//   elSearchGanreSelect.appendChild(elOptionsFragment);
// }
// createGenreSelectOptions();

// let renderResults = (searchResults) => {
//   elSearchResults.innerHTML = "";

//   let elSearchResultFragment = document.createDocumentFragment();

//   searchResults.forEach((movie) => {
//     let elMovie = elSearchResultTemplate.cloneNode(true);

//     $(".movie__poster", elMovie).src = movie.smallPoster;
//     $(".movie__title", elMovie).textContent = movie.title;
//     $(".movie__year", elMovie).textContent = movie.year;
//     $(".movie__rating", elMovie).textContent = movie.imdbRating;
//     $(".movie__trailer-link", elMovie).href = movie.trailer;

//     elSearchResultFragment.appendChild(elMovie);
//   });

//   elSearchResults.appendChild(elSearchResultFragment);
// }

// let findMovies = (title, minRating, genre) => {
//   return normalizedMovies.filter((movie) => {
//     let doesMatchCategory = genre === "All" || movie.categories.includes(genre);

//     return movie.title.match(title) && movie.imdbRating >= minRating && doesMatchCategory;
//   })
// }

// elSearchForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   let searchTitle = elSearchTitleInput.value.trim();
//   let movieTitleRegex = new RegExp(searchTitle, "gi");

//   let minimumRating = Number(elSearchRatingInput.value);

//   let genre = elSearchGanreSelect.value;

//   let searchResults = findMovies(movieTitleRegex, minimumRating, genre);

//   renderResults(searchResults);
// });