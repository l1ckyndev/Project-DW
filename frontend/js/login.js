document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            authenticateUser(username, password);
        });
    }
});

function authenticateUser(username, password) {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'index.html'; // Ajuste o caminho conforme necessário
            } else {
                alert('Invalid credentials.');
            }
        })
        .catch(error => {
            console.error('Error during authentication:', error);
        });
}
