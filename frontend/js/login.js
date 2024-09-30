document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const response = await loginUser(email, password);
            console.log(response);
        });
    }
});

async function loginUser(email, password) {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify({ username: data.username, lastLogin: new Date() })); // Armazenando o username
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redireciona para a página index
    } else {
        alert(data.message || 'Erro ao fazer login.');
    }
}
