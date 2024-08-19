document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', '../components/header.html');
    loadComponent('footer', '../components/footer.html');
});

// Função para carregar o conteúdo de um componente
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (id === 'header') {
                updateHeader(); // Atualiza o cabeçalho com informações do usuário
            }
        })
        .catch(error => console.error(`Error loading ${id}:`, error));
}

// Função para atualizar o cabeçalho com informações do usuário
function updateHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const userGreeting = document.getElementById('userGreeting');
        if (userGreeting) {
            userGreeting.textContent = `Bem-vindo, ${user.username}`;
        }

        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                sessionStorage.removeItem('user');
                window.location.href = '../pages/login.html'; // Ajuste o caminho se necessário
            });
        }
    } else {
        window.location.href = '../pages/login.html'; // Ajuste o caminho se necessário
    }
}
