import Movie from '/models/movie.js';
import Serie from '/models/serie.js';

let movieId = '';
let serieId = '';

let movie;
let serie;

let type;
let mediaId;
let title;


$(document).ready(async function(){
    //Déclaration des variables
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    movieId = parseInt(params.get('movie'));
    serieId = parseInt(params.get('tvshow'));

    if(movieId){
        //Import des films
        const movieInstance = new Movie();
        movie = await movieInstance.getMovieById(movieId);

        type = 'movie';
        mediaId = movieId;
        title = movie.title;

        setDetails(movie, movieInstance);
    }
    
    if(serieId){
        //Import des séries 
        const serieInstance = new Serie();
        serie = await serieInstance.getSerieById(serieId);

        type = 'serie';
        mediaId = serieId;
        title = serie.name

        setDetails(serie, serieInstance);
    }

    isFav(mediaId)
    addToFavorite()
})

async function setDetails(movie, movieInstance){
    //Eléments du DOM à modifier
    const title = $('#details_title');
    const release_date = $('#details_releaseDate');
    const genres = $('#details_genres');
    const picture = $('#details_picture');
    const overview = $('#details_overview');
    const reviews = $('#details_comments');

    //Modification du DOM
    if(movieId){
        title.html(movie.title);
    }else{
        title.html(movie.name);
    }
    release_date.html(movie.release_date);
    //Gestion des genres multiples
    let allGenres = '';
    const genreNames = movie.genres.map(genre => genre.name);
    allGenres = genreNames.join(', ');
    genres.html(allGenres);
    //---------------------------------
    picture.attr('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    overview.html(movie.overview);

    //Gestion des commentaires
    const comments = await movieInstance.getReviewsById(movie.id);
    let commentHtml;
    comments.results.forEach(result => {
        // Crée dynamiquement l'élément HTML pour chaque commentaire
        const commentHtml = $(`
            <div class="comment_container">
                <div class="comment_author">
                    <img src="/assets/img/unknow_user.svg" class="comment_avatar">
                    <p>${result.author}</p>
                </div>
                <div class="comment_rate">
                    <p>
                        <span name="1"></span>
                        <span name="2"></span>
                        <span name="3"></span>
                        <span name="4"></span>
                        <span name="5"></span>
                        ${result.author_details.rating / 2}
                    </p>
                </div>
                <div class="comment_content"><p>${result.content}</p></div>
            </div>
            <hr>
        `);

        //On place les étoiles en fonction de la note
        let rate = result.author_details.rating/2;

        commentHtml.find('.comment_rate span').each(function(index) {
            // Vérifie si rate n'est pas un entier
            const isDecimal = !Number.isInteger(rate);
        
            // Si l'index est inférieur à la partie entière, on met une étoile pleine
            if (index < Math.floor(rate)) {
                $(this).html(`<img src="/assets/img/fullStar.png" alt="Étoile pleine">`);
            } 
            // Si c'est un demi et que l'index correspond à la partie entière, place une demi-étoile
            else if (isDecimal && index === Math.floor(rate)) {
                $(this).html(`<img src="/assets/img/halfStar.png" alt="Étoile moitié">`);
            }
            // Sinon, place une étoile vide
            else {
                $(this).html(`<img src="/assets/img/emptyStar.png" alt="Étoile vide">`);
            }
        });
    
        // Si un avatar est disponible, on remplace l'image
        if (result.author_details.avatar_path) {
            const avatarUrl = `https://image.tmdb.org/t/p/w500${result.author_details.avatar_path}`;
            commentHtml.find('.comment_avatar').attr('src', avatarUrl);
        }
    
        // Ajoute le commentaire au conteneur des commentaires
        reviews.append(commentHtml);
    });

}

function addToFavorite(){
    const favoriteButton = $('#favoriteButton');
    favoriteButton.on('click', async function(){
        //Vérifier si l'utilisateur est connecté
        const token = sessionStorage.getItem('sessionToken');
        const response = await fetch('http://localhost:8000/auth/isConnected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        //si non afficher une erreur

        //si oui:
        //Récupérer les favoris de l'utilisateur
        if(response.ok){
            const userId = sessionStorage.getItem('userId');
            let result = await fetch(`http://localhost:8000/users/getFavorites/${userId}`, {
                method: 'GET',
            })
            const data = await result.json();
            let favorites = [];
            let exist = false;

            //Si l'utilisateur a des favoris
            if (data.favorites) {
                //On vérifie que le favori ajouté n'existe pas déjà, si c'est le cas on le retire des favoris existants
                data.favorites.forEach((favorite, index) => {
                    if (!(favorite.mediaId == movieId || favorite.mediaId == serieId)){
                        favorites.push(favorite);
                    }else{
                        exist = true;
                    }
                })
                //Ensuite on se rajoute notre nouveau favori
                
                if(!exist){
                    setFav('add', type, mediaId, title, userId, favorites)
                }else{
                    setFav('delete', type, mediaId, title, userId, favorites);
                }
            }else{
                setFav('create', type, mediaId, title, userId, favorites);
            }
        }
    })
}

async function setFav(action, type, mediaId, title, userId, favorites){
    const favoriteHeart = $('#favoriteButton').find('svg');
    let newFavoriteArray = [];
    let newFav;
    if(action == 'add' || action == 'create'){
        newFav = {
            type: type,
            mediaId: mediaId,
            title: title
        }

        favoriteHeart.addClass('fullHeart animate__heartBeat');
        setTimeout(()=>{
            favoriteHeart.removeClass('animate__heartBeat');
        }, 1000)
    }

    if(action == 'create'){
        newFavoriteArray.push(newFav);
        console.log('newFav')
        console.log(newFav);
    }

    if(action == 'add'){
        console.log('action == add')
        favorites.push(newFav)
        newFavoriteArray = favorites;
    }

    if(action == 'delete'){
        newFavoriteArray = favorites;

        favoriteHeart.removeClass('fullHeart')
        favoriteHeart.addClass('animate__heartBeat');
        setTimeout(()=>{
            favoriteHeart.removeClass('animate__heartBeat');
        }, 1000)
    }

    const response = await fetch('http://localhost:8000/users/addFavorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newFavoriteArray, userId})
    })
    const data = await response.json();

    console.log(data)
}

async function isFav(mediaId){
    const favButton = $('#favoriteButton').find('svg');

    //Vérifier si l'utilisateur est connecté
    const token = sessionStorage.getItem('sessionToken');
    const response = await fetch('http://localhost:8000/auth/isConnected', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const userId = sessionStorage.getItem('userId');
    let result = await fetch(`http://localhost:8000/users/getFavorites/${userId}`, {
        method: 'GET',
    })
    const data = await result.json();
    data.favorites.forEach(favorite => {
        if(favorite.mediaId == mediaId){
            favButton.addClass('fullHeart');
        }
    })
}

