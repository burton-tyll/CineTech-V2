class Setup {

    async getApiAccess() {
        const config = await fetch('/assets/security/config.json');
        const configJSON = await config.json();
        const accessToken = await configJSON.API_ACCESS_TOKEN;

        return accessToken;
    }

    getOptions(token){
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        return options;
    }

}

export default Setup; 
