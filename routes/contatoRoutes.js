// routes/contatoRoutes.js
import express from 'express';
// Importando as funções nomeadas do seu contatoController.js
import { mostrarFormularioContato, enviarFormularioContato } from '../controllers/contatoController.js';

const router = express.Router();

// Rota para exibir o formulário de contato (GET)
// Será acessível como GET /contato/ (quando montado no index.js)
router.get('/', mostrarFormularioContato);

// Rota para receber e processar os dados do formulário de contato (POST)
// Será acessível como POST /contato/enviar (quando montado no index.js)
router.post('/enviar', enviarFormularioContato);

export default router; // Exporta o router