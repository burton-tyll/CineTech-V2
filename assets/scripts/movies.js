import Setup from '/assets/scripts/setup';

class Movies{

    constructor(){
        let setup = new Setup();
        this.setup = setup;
    }
    
    async getAllMovies() {
        try {
            await this.setup.init(); // Attendez que la configuration soit chargée
            const options = this.setup.getOptions(); // Récupérer les options
            const response = await fetch('https://api.themoviedb.org/3/movie/popular', options); // Utiliser les options pour faire la requête
            
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des films');
            }
            
            const data = await response.json();
            console.log('Données des films:', data); // Traitez les données comme nécessaire
        } catch (error) {
            console.error('Erreur dans getAllMovies:', error); // Gérer les erreurs
        }
    }
}