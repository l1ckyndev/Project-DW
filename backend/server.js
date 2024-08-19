const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Configure o servidor para usar middlewares padrão
server.use(middlewares);

// Adiciona rotas adicionais, se necessário
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}));

// Use o arquivo de dados do JSON Server
server.use(router);

// Define a porta em que o servidor vai escutar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
