const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 
const historicoRoutes = require('./routes/historicoRoutes'); 
const tracertRoutes = require('./routes/tracertRoutes'); // Importa as rotas de traceroute

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes); 
app.use('/api/historico', historicoRoutes); 
app.use('/api/traceroute', tracertRoutes); // Atualizar para incluir /api

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
