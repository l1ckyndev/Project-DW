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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Traceroute data:', data); // Log the entire data object for debugging

            // Check if the data is an array and contains objects with the 'result' property
            const tracerouteEntry = data.find(entry => entry.target === target);
            if (tracerouteEntry && Array.isArray(tracerouteEntry.result)) {
                renderTracerouteResult(tracerouteEntry.result);
            } else {
                throw new Error('Unexpected data format: result array missing for the target');
            }
        })
        .catch(error => {
            console.error('Error running traceroute:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p class="text-danger">Error running traceroute: ${error.message}</p>`;
        });
}

function renderTracerouteResult(result) {
    const resultDiv = document.getElementById('result');
    let html = '<table class="table table-striped">';
    html += '<thead><tr><th>Hop</th><th>IP Address</th></tr></thead>';
    html += '<tbody>';
    result.forEach((entry) => {
        const [hop, ip] = entry.split(' ');
        html += `<tr><td>${hop}</td><td>${ip}</td></tr>`;
    });
    html += '</tbody></table>';
    resultDiv.innerHTML = html;
}
