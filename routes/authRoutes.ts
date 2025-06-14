import { Router } from 'express';
// Importa as duas funções do controller
import { loginUser, logoutUser } from '../controllers/authController';

const router = Router();

// A rota de login continua sendo chamada pela API do formulário
router.post('/login', loginUser);

// ROTA NOVA: para o usuário sair da conta
router.get('/logout', logoutUser);

export default router;
