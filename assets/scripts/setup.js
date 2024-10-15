class Setup {

    constructor(){
        this.apiAccessToken = '';
        this.options = {};
    }

    async init() {
        await this.loadConfig(); // Charger la configuration au démarrage
    }

    async loadConfig() {
        try {
            const response = await fetch('/assets/security/config.json');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement de config.json');
            }
            const config = await response.json();
            this.apiAccessToken = config.API_ACCESS_TOKEN; // Stocker le token
            this.setupOptions(); // Configurer les options après avoir chargé le token
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    setupOptions() {
        this.options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.apiAccessToken}`, // Utiliser le token chargé
            }
        };
    }

    async getOptions(){
        return this.options;
    }
       
}