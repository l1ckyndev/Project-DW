const express = require('express');
const prisma = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const prismaClient = new prisma.PrismaClient();
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret'; // Substitua por uma chave forte

// Registro de novo usuário
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prismaClient.user.create({
            data: { username, email, password: hashedPassword },
        });

        res.json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
});

// Login do usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login realizado com sucesso', token });
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Você acessou uma rota protegida!' });
});

// Inicie o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
