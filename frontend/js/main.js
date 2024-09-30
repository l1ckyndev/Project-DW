document.addEventListener('DOMContentLoaded', function() {
    sessionStorage.setItem('user', JSON.stringify({ username: user.username, lastLogin: new Date() }));

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        window.location.href = 'login.html'; // Redireciona se o usuário não estiver autenticado
    } else {
        document.getElementById('userGreeting').textContent = user.username || 'Usuário'; // Use um valor padrão se username estiver indefinido
        document.getElementById('lastLogin').textContent = new Date(user.lastLogin).toLocaleString();

        document.getElementById('logout').addEventListener('click', function() {
            sessionStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
});
