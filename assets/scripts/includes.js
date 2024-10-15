// Fonction pour inclure des fichiers HTML
function includeHTML() {
    // Sélectionner tous les éléments qui doivent inclure des templates
    document.querySelectorAll('[data-include]').forEach(async (element) => {
        let file = '/templates/' + element.getAttribute('data-include'); // Modifier ici pour inclure le bon chemin

        // Faire une requête pour charger le fichier HTML
        let response = await fetch(file);
        
        if (response.ok) {
            // Insérer le contenu du fichier HTML dans l'élément
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = "Content not found.";
        }
    });
}

// Charger le contenu HTML une fois que la page est entièrement chargée
window.addEventListener('DOMContentLoaded', includeHTML);