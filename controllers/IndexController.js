import Movie from '/models/movie.js';

$(document).ready(async function(){

    const movieInstance = new Movie();
    let movies = '';

    //MostPopular Section
    let popularMovies = await movieInstance.getMostPopularMovies();
    let mostPopular_section = $('#mostPopular').find('.movie_carousel');
    movies = '';

    popularMovies.results.forEach(movie => {
        movies +=(`<a href="/views/details.html?movie=${movie.id}"><div class="movie_poster"><div class="infos"><div class="infos_title"><h2>${movie.title}</h2></div><div class="infos_category"></div><div class="infos_synopsis"><p>${movie.overview}</p></div></div><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></div></a>`)
    })
    mostPopular_section.html(movies);

    //Animation Section
    let animationMovies = await movieInstance.getAnimationMovies();
    let animation_section = $('#animation').find('.movie_carousel');
    movies = '';

    animationMovies.results.forEach(movie => {
        movies +=(`<a href="/views/details.html?movie=${movie.id}"><div class="movie_poster"><div class="infos"><div class="infos_title"><h2>${movie.title}</h2></div><div class="infos_category"></div><div class="infos_synopsis"><p>${movie.overview}</p></div></div><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></div></a>`)
    })
    animation_section.html(movies);
})