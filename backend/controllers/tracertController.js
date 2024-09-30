const { exec } = require('child_process');

function med(time1, time2, time3) {
  const times = [time1, time2, time3].map(t => parseInt(t)); // Converte as strings em números
  const average = times.reduce((acc, val) => acc + val, 0) / times.length; // Calcula a média
  return `${average.toFixed(2)} ms`; // Retorna a média com 2 casas decimais
}

function parseTracerouteOutput(output) {
    if (!output) {
      console.error('Nenhuma saída foi fornecida ao parseTracerouteOutput');
      return []; // Retorna um array vazio se não houver saída
    }
  
    const lines = output.split('\n'); // Divide a saída em linhas
    const hops = [];
  
    lines.forEach((line) => {
      // Regex para capturar as linhas de hop que contêm o número do salto e o IP
      const hopMatch = line.match(/^\s*(\d+)\s+.*?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
      if (hopMatch) {
        const hop = hopMatch[1];  // Número do salto
        const ip = hopMatch[2];   // Endereço IP
        hops.push({ hop, ip });
      }
    });
  
    return hops;
  }
  
// Controlador para executar o nslookup
const dig = (req, res) => {
  const host = req.params.host;

  exec(`nslookup ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ message: `Erro ao executar nslookup: ${error.message}` });
    }
    if (stderr) {
      return res.status(500).json({ message: `Erro: ${stderr}` });
    }
    res.json({ output: stdout });
  });
};

// Controlador para executar o traceroute
const traceroute = (req, res) => {
  const host = req.params.host;

  exec(`tracert -h 3 ${host}`, (error, stdout, stderr) => {
      if (error) {
          console.error('Erro de execução:', error);
          return res.status(500).send('Erro ao executar traceroute: ' + error.message);
      }
      if (stderr) {
          console.error('Stderr:', stderr);
          return res.status(500).send('Erro: ' + stderr);
      }

      // Log da saída completa para depuração
      console.log('Saída do tracert:', stdout);

      // Captura hop, três tempos de resposta e IP, e calcula a média dos tempos
      const hops = stdout.split('\n').map(line => {
          const match = line.match(/^\s*(\d+)\s+(\d+\s*ms)\s+(\d+\s*ms)\s+(\d+\s*ms)\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
          return match ? { 
              hop: match[1],
              times: med(match[2], match[3], match[4]), // Calcula a média das 3 interações
              ip: match[5]
          } : null;
      }).filter(Boolean); // Remove entradas nulas

      console.log('Hops capturados:', hops); // Verifique os dados capturados
      res.json({ hops });
  });
}

module.exports = {
  dig,
  traceroute,
};
