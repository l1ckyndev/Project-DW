document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('userGreeting').textContent = user.username;
        document.getElementById('lastLogin').textContent = new Date(user.lastLogin).toLocaleString();

        document.getElementById('logout').addEventListener('click', function() {
            sessionStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
});
