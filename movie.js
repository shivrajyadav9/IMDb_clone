const apiKey = '81762ca3';
const id = JSON.parse(localStorage.getItem('currentMovie'));

// fetch movie details when page loads
window.onload = async function () {
    let data = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    let movie = await data.json();
    displayMovie(movie);
    console.log(movie);
}

// function to display movie details
function displayMovie(movie) {
    let detailsContainer = document.getElementById('movie');
    let details = document.createElement('div');
    details.id = 'movie-details';
    details.innerHTML = ` <div id="poster">
    <img src="${movie.Poster}">
</div>
<div id="details">
    <div id="text">
        <p id="title">${movie.Title}</p>
        <p>${movie.Plot}</p>
        <br>
        <p><b>Year : </b> ${movie.Year}</p>
        <p><b>Language : </b> ${movie.Language}</p>
        <p><b>Rated : </b> ${movie.Rated}</p>
        <p><b>Genre : </b> ${movie.Genre}</p>
        <p><b>Runtime : </b>${movie.Runtime}</p>
        <p><b>Director : </b> ${movie.Director}</p>
        <p><b>Actors : </b> ${movie.Actors}</p>
        <p><b>IMDb Rating : </b> ${movie.imdbRating}</p>
    </div>
    <div class="favourite-button"> 
        <input type="submit" value="Add to Favourites" class="favourites-button" id="${movie.imdbID}">
    </div>

</div>`;

    detailsContainer.appendChild(details);
    let favouriteButtons = document.getElementsByClassName('favourites-button');
    for (let button of favouriteButtons) {
        button.addEventListener('click', addFavourite);
    }
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