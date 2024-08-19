document.addEventListener('DOMContentLoaded', function() {
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

function registerUser(username, password) {
    console.log('Registering user with username:', username);
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
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        return response.json();
    })
    .then(data => {
        console.log('User registered successfully:', data);
        window.location.href = 'login.html';  // Ajuste o caminho conforme necessário
        alert('User registered successfully!');
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert('Failed to register user. Please try again.');
    });
}
