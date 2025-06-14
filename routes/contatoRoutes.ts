import { Router } from 'express';
import { submitContato } from '../controllers/contatoController';

const router = Router();

// Esta rota vai renderizar a página do formulário
router.get('/', (req, res) => {
  res.render('contato');
});

// Esta rota vai processar o envio do formulário
router.post('/', submitContato);

export default router;
