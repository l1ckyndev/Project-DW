// updateHeader.js
export function updateHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        // Exibe a saudação ao usuário
        const userGreeting = document.getElementById('userGreeting');
        if (userGreeting) {
            userGreeting.textContent = `Bem-vindo, ${user.username}`;
        }

        // Adiciona a funcionalidade de logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                sessionStorage.removeItem('user');
                window.location.href = '../pages/login.html'; // Ajuste conforme necessário
            });
        }
    } else {
        window.location.href = '../pages/login.html'; // Ajuste conforme necessário
    }
}
