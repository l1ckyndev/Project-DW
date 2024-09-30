document.addEventListener('DOMContentLoaded', function() {
    // Lida com o envio do formulário de traceroute
    const tracerouteForm = document.getElementById('tracerouteForm');
    if (tracerouteForm) {
        tracerouteForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do formulário
            const target = document.getElementById('target').value; // Obtém o valor do campo de input
            runTraceroute(target); // Chama a função para rodar o traceroute
        });
    }
});

// Função para fazer o fetch do traceroute
function runTraceroute(target) {
    fetch(`http://localhost:3000/api/traceroute/dig/${encodeURIComponent(target)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            console.log('nslookup data:', data); // Debug para ver os dados do nslookup
            renderTracerouteResult(data.output.split('\n')); // Processa e exibe o resultado
        })
        .catch(error => {
            console.error('Error running nslookup:', error);
            displayError(error.message); // Função que exibe erros no front-end
        });
}

// Função para exibir o resultado do traceroute
function renderTracerouteResult(result) {
    const resultDiv = document.getElementById('result');
    let html = '<table class="table table-striped">';
    html += '<thead><tr><th>Tick</th><th>Domain Information</th></tr></thead>';
    html += '<tbody>';
    
    result.forEach((entry, index) => {
        if (entry.trim() !== '') { // Evita adicionar linhas vazias
            html += `<tr><td>${index + 1}</td><td>${entry}</td></tr>`; // Adiciona hop e IP à tabela
        }
    });
    
    html += '</tbody></table>';
    resultDiv.innerHTML = html; // Exibe a tabela no div de resultados
}

// Função para exibir erros no frontend
function displayError(errorMessage) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p class="text-danger">Error: ${errorMessage}</p>`;
}
