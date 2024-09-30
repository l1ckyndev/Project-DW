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
    fetch(`http://localhost:3000/api/traceroute/traceroute/${encodeURIComponent(target)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            console.log('Traceroute data:', data); // Verifique a estrutura dos dados

            // Verifica se a propriedade 'hops' está definida e é um array
            if (data.hops && Array.isArray(data.hops)) {
                renderTracerouteResult(data.hops); // Processa e exibe o resultado
            } else {
                throw new Error('Hops não estão disponíveis ou não são um array.');
            }
        })
        .catch(error => {
            console.error('Error running traceroute:', error);
            displayError(error.message); // Função que exibe erros no front-end
        });
}



// Função para exibir o resultado do traceroute
function renderTracerouteResult(result) {
    const resultDiv = document.getElementById('result');
    let html = '<table class="table table-striped">';
    html += '<thead><tr><th>Hop</th><th>MS</th><th>IP Address</th></tr></thead>';
    html += '<tbody>';
    
    result.forEach((entry) => {
        if (entry) {
            html += `<tr><td>${entry.hop}</td><td>${entry.times || 'N/A'}</td><td>${entry.ip}</td></tr>`; // Adiciona ms, se disponível
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
