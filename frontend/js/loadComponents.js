// loadComponents.js
import { updateHeader } from '../components/header/header.js';

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', '../components/header/header.html');
    loadComponent('footer', '../components/footer/footer.html');
});

// Função para carregar o conteúdo de um componente
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (id === 'header') {
                updateHeader();
            }
        })
        .catch(error => console.error(`Error loading ${id}:`, error));
}
