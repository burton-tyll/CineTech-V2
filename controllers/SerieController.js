import Serie from '/models/serie.js';
import initPagination from '/assets/scripts/pagination.js';

$(document).ready(async function(){
    //Déclaration des variables
    const serieInstance = await new Serie();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const serieGrid = $('.movie-grid');
    let page = parseInt(params.get('page'));
    let series;

    //-----
    //-----Exécution
    //-----
    initPagination(page, url);


    //Affichage des films au chargement de page
    if (!params.has('page')){
        url.searchParams.set('page', 1);
        window.location.href = url.toString();
    }else{
        series = await serieInstance.getSeriePage(page);
    }
    let htmlToAppend = '';
    series.results.forEach(serie => {
        if (serie.overview.length < 1){
            serie.overview = 'Aucune description pour le moment, envoyez nous une suggestion ici 👇<br><button class="suggest">Suggérer</button>'
        }
        if (serie.poster_path != null){
            htmlToAppend += `<a href="/views/details.html?movie=${serie.id}"><div class="movie_poster"><div class="infos"><div class="infos_title"><h2>${serie.title}</h2></div><div class="infos_category"></div><div class="infos_synopsis"><p>${serie.overview}</p></div></div><img src="https://image.tmdb.org/t/p/w500${serie.poster_path}"></div></a>`
        }
    })
    serieGrid.html(htmlToAppend);

})