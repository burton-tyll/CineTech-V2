import Movie from '/models/movie.js';
import initPagination from '/assets/scripts/pagination.js';

$(document).ready(async function(){
    //Déclaration des variables
    const movieInstance = await new Movie();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const movieGrid = $('.movie-grid');
    let page = parseInt(params.get('page'));
    let movies;

    //-----
    //-----Exécution
    //-----
    initPagination(page, url);


    //Affichage des films au chargement de page
    if (!params.has('page')){
        url.searchParams.set('page', 1);
        window.location.href = url.toString();
    }else{
        movies = await movieInstance.getMoviePage(page);
    }
    let htmlToAppend = '';
    movies.results.forEach(movie => {
        if (movie.overview.length < 1){
            movie.overview = 'Aucune description pour le moment, envoyez nous une suggestion ici 👇<br><button class="suggest">Suggérer</button>'
        }
        if (movie.poster_path != null){
            htmlToAppend += `<a href="/views/details.html?movie=${movie.id}"><div class="movie_poster"><div class="infos"><div class="infos_title"><h2>${movie.title}</h2></div><div class="infos_category"></div><div class="infos_synopsis"><p>${movie.overview}</p></div></div><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></div></a>`
        }
    })
    movieGrid.html(htmlToAppend);

})