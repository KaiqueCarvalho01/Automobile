// routes/contatoRoutes.js
import express from 'express';
import { mostrarFormularioContato, enviarFormularioContato } from '../controllers/contatoController';

const router = express.Router();

// Rota para exibir o formulário de contato (GET)
// Será acessível como GET /contato/ (quando montado no index.js)
router.get('/', mostrarFormularioContato);

// Rota para receber e processar os dados do formulário de contato (POST)
// Será acessível como POST /contato/enviar (quando montado no index.js)
router.post('/enviar', enviarFormularioContato);

export default router; // Exporta o router