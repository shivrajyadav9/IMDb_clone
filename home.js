const apiKey = '81762ca3';

// show results from last search when page loads
window.onload = async function () {
    let lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    if (lastSearch == null) {
        lastSearch = 'avengers';
    }
    let results = await search(lastSearch);
    displaySearchResults(results);
}

// function to search movies
async function search(query) {
    localStorage.setItem('lastSearch', JSON.stringify(query));
    try {
        let results = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`);
        let data = await results.json();
        return data.Search;
    }
    catch (err) {
        console.log('Error in searching ', err);
    }
}

// function to set clicked movie in local storage
function setCurrentMovie(e) {
    let imdbID = e.target.dataset.id;
    localStorage.setItem('currentMovie', JSON.stringify(imdbID));
    return;
}

// function to add favourite
function addFavourite(e) {
    let imdbID = e.target.id;
    let favourites = JSON.parse(localStorage.getItem('favouriteMovies'));
    if (favourites) {
        let index = favourites.indexOf(imdbID);
        if (index == -1) {
            favourites.push(imdbID);
            localStorage.setItem('favouriteMovies', JSON.stringify(favourites));
            alert('Added to Favourites');
        }
        else {
            alert('Already added to Favourites');
        }

    }
    else {
        let favourites = [];
        favourites.push(imdbID);
        localStorage.setItem('favouriteMovies', JSON.stringify(favourites));
        alert('Added to Favourites');
    }
    return;
}

// function to display search results
function displaySearchResults(results) {
    let resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    for (let movie of results) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
         <a href="movie.html">
        <div class="poster">
            <img src="${movie.Poster}" data-id="${movie.imdbID}">
        </div>
    </a>
    <div class="favourite-button"> 
        <input type="submit" value="Add to Favourites" class="favourites-button" id="${movie.imdbID}">
    </div>`;
        resultsContainer.appendChild(movieCard);
    }

    let favouriteButtons = document.getElementsByClassName('favourites-button');
    for (let button of favouriteButtons) {
        button.addEventListener('click', addFavourite);
    }
    let links = document.querySelectorAll('.movie-card a');
    for (let link of links) {
        link.addEventListener('click', setCurrentMovie);
    }
    return;
}


// add event listner to search box
let searchBox = document.getElementById('search-box');
searchBox.addEventListener('keyup', a);

let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', a);

function a(e) {
    try {
        console.log('search buttton pressed');
        e.preventDefault();
        console.log('hello');
        let searchTerm = document.getElementById('search-box').value.trim();
        if (searchTerm.length > 0) {
            console.log(searchTerm);
            search(searchTerm)
                .then((results) => {
                    displaySearchResults(results);
                })

        }
    }
    catch (err) {
        console.log('Error in searching movie', err);
    }
    return;
}