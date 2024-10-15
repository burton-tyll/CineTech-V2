import Movie from '/models/movie.js';

$(document).ready(async function(){
    //Déclaration des variables
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let movieId = parseInt(params.get('movie'));

    const movieInstance = new Movie();
    const movie = await movieInstance.getMovieById(movieId);

    //Eléments du DOM à modifier
    const title = $('#details_title');
    const release_date = $('#details_releaseDate');
    const genres = $('#details_genres');
    const picture = $('#details_picture');

    title.html(movie.title);
    release_date.html(movie.release_date);
    //Gestion des genres multiples
    let allGenres = '';
    const genreNames = movie.genres.map(genre => genre.name);
    allGenres = genreNames.join(', ');
    genres.html(allGenres)
    //---------------------------------
    picture.attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
})