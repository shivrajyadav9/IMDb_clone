let a = function () {
    const apiKey = '81762ca3';
    console.log()
    window.onload = b;
    async function b() {
        let favourites = JSON.parse(localStorage.getItem('favouriteMovies'));
        console.log('fav', favourites);
        let movies = [];
        for (let favourite of favourites) {
            let movie = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${favourite}`);
            let data = await movie.json();
            console.log(data);
            movies.push(data);
        }
        // console.log(movies);
        displayFavourite(movies);
    }

    // // function to set clicked movie in local storage
    function setCurrentMovie(e) {
        // e.preventDefault();
        console.log('hello');
        let imdbID = e.target.dataset.id;
        console.log('current movie', imdbID);
        localStorage.setItem('currentMovie', JSON.stringify(imdbID));
    }

    // function to remove favourite
    function removeFavourite(e) {
        let imdbID = e.target.id;
        console.log(imdbID);
        let favourites = JSON.parse(localStorage.getItem('favouriteMovies'));
        var index = favourites.indexOf(imdbID);
        if (index !== -1) {
            favourites.splice(index, 1);
        }
        localStorage.setItem('favouriteMovies', JSON.stringify(favourites));
        alert('Removed from Favourites');
        b();
    }

    // function to display the favourite movies
    function displayFavourite(results) {
        let resultsContainer = document.getElementById('favourite-movies');
        resultsContainer.innerHTML = '';
        for (let movie of results) {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
         <a href="movie.html" ">
        <div class="poster">
            <img src="${movie.Poster}" data-id="${movie.imdbID}">
        </div>
    </a>
    <div class="favourite-button"> 
        <input type="submit" value="Remove from Favourites" class="favourites-button" id="${movie.imdbID}">
    </div>`;
            resultsContainer.appendChild(movieCard);
        }

        let favouriteButtons = document.getElementsByClassName('favourites-button');
        for (let button of favouriteButtons) {
            button.addEventListener('click', removeFavourite);
        }
        let links = document.querySelectorAll('.movie-card a');
        for (let link of links) {
            link.addEventListener('click', setCurrentMovie);
        }
    }
};
a();