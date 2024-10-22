import Setup from '/assets/scripts/setup.js';



class Movie {
    constructor() {
        this.setup = new Setup();
    }
    
    async getAllMovies() {
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=1&sort_by=popularity.desc', options);
        
        const data = response.json();
        return data;
    }

    async getMoviePage(page){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-US&page=${page}&sort_by=popularity.desc`, options);
        
        const data = response.json();
        return data;
    }

    async getMovieById(id){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=fr-FR`, options);
        
        const data = response.json();
        return data;
    }

    async getSliderMovies(){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc`, options);
        
        let data = await response.json();
        let movies = [];

        for(let i=0; i < 3; i++){
            if(data.results[i].backdrop_path){
                movies.push(data.results[i]);
            }else{
                i = 2;
            }
        }

        return movies;
    }

    async getMostPopularMovies(){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc`, options);
        
        const data = response.json();
        return data;
    }

    async getAnimationMovies(){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=16`, options);
        
        const data = response.json();
        return data;
    }

    async getReviewsById(id){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options);

        const data = response.json();
        return data;
    }
}

export default Movie;
