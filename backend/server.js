const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes); 

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
