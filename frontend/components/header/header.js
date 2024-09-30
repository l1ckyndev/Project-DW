// header.js
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
                sessionStorage.removeItem('user'); // Remove o usuário do sessionStorage
                sessionStorage.removeItem('token'); // Remove o token do sessionStorage, se necessário
                window.location.href = 'login.html'; // Redireciona para a página de login
            });
        }
    } else {
        // Se não houver usuário, redireciona para a página de login
        window.location.href = 'login.html'; 
    }
}
