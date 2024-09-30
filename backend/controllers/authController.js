const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // Certifique-se de instalar o bcrypt
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// Função de registro
async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        // Verifique se o usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crie o usuário
        const user = await prisma.user.create({
            data: {
                username: username, // Assegure-se de que seu modelo esteja atualizado
                email: email,
                password: hashedPassword, // Armazene a senha hashed
            },
        });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
}

// Função de login
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verifique a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username: user.username });        
        
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
}

module.exports = { register, login };
