document.addEventListener('DOMContentLoaded', function() {
    // Handle traceroute form submission
    const tracerouteForm = document.getElementById('tracerouteForm');
    if (tracerouteForm) {
        tracerouteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const target = document.getElementById('target').value;
            runTraceroute(target);
        });
    }
});

function runTraceroute(target) {
    fetch(`http://localhost:3000/traceroute?target=${encodeURIComponent(target)}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            console.error('Error running traceroute:', error);
        });
}
