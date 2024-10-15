import Movie from '/models/movie.js';

let i = 0;  // Démarrer à 0 pour accéder à la première image
const totalSlides = 3;
const sliderImg = $('#slider_poster');
const movieInstance = await new Movie();
const movies = await movieInstance.getSliderMovies();

function nextSlide() {
    i = (i + 1) % totalSlides;  // Modifie l'index de manière cyclique
    sliderImg.attr("src", `https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`);
}

function prevSlide() {
    i = (i - 1 + totalSlides) % totalSlides;  // Modifie l'index de manière cyclique inverse
    sliderImg.attr("src", `https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`);
}

$(document).ready(function() {
    $("#next").on("click", nextSlide);
    $("#previous").on("click", prevSlide);

    // Initialiser l'image avec la première image
    sliderImg.attr('src', `https://image.tmdb.org/t/p/original${movies[i].backdrop_path}`);
});
