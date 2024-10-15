import Setup from '/assets/scripts/setup.js';



class Serie {
    constructor() {
        this.setup = new Setup();
    }

    async getSeriePage(page){
        const apiAccessToken = await this.setup.getApiAccess();
        const options = this.setup.getOptions(apiAccessToken);
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=fr-US&page=${page}&sort_by=popularity.desc`, options);
        
        const data = response.json();
        return data;
    }
}

export default Serie;