// routes/propostaRoutes.js
import express from 'express';
// Importando as funções nomeadas do controller
import { mostrarFormularioProposta, enviarProposta } from '../controllers/propostaController.js';

const router = express.Router();

// GET / (será /proposta/ quando montado no index.js) -> chama a função mostrarFormularioProposta
router.get('/', mostrarFormularioProposta);

// POST /enviar (será /proposta/enviar quando montado no index.js) -> chama a função enviarProposta
router.post('/enviar', enviarProposta);

export default router; // Exporta o router como padrão