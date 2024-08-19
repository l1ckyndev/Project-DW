document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Login successful!');
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = '../pages/index.html'; // Certifique-se de que o caminho está correto
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => console.error('Error:', error));
});


// auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            authenticateUser(username, password);
        });
    }

    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password === confirmPassword) {
                registerUser(username, password);
            } else {
                alert('Passwords do not match.');
            }
        });
    }
});

function authenticateUser(username, password) {
    // Simulate authentication
    // Replace with actual authentication logic
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials.');
            }
        });
}

function registerUser(username, password) {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('User registered successfully!');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error registering user:', error);
    });
}
