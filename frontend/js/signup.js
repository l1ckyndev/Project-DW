// frontend/js/signup.js
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value; // Campo de email
            const password = document.getElementById('registerPassword').value;  
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password === confirmPassword) {
                const response = await registerUser(username, email, password);
                console.log(response);
            } else {
                alert('As senhas não coincidem.'); // Mensagem de erro se as senhas não coincidirem
            }
        });
    }
});

async function registerUser(username, email, password) {
    console.log('Tentando registrar usuário:', { username, email, password }); // Log dos dados enviados

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }) // Envia username, email e password
    });

    const data = await response.json();
    
    if (response.ok) {
        alert('Registro bem-sucedido! Por favor, faça login.'); // Mensagem de sucesso
        window.location.href = 'login.html'; // Redireciona para a página de login
    } else {
        alert(data.message || 'Erro ao registrar.'); // Exibe a mensagem de erro
    }
}
