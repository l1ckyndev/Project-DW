const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/historico', async (req, res) => {
    const { traceroute } = req.body; // O traceroute deve ser enviado no corpo da requisição
    const userId = req.user.id; // Assumindo que você tenha a autenticação configurada e o ID do usuário disponível

    try {
        const historico = await prisma.historico.create({
            data: {
                userId: userId,
                traceroute: traceroute,
            },
        });
        res.status(201).json(historico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving traceroute' });
    }
});

module.exports = router;
