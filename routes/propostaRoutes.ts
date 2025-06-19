import { Router } from 'express';
import { submitProposta } from '../controllers/propostaController';

const router = Router();

router.get('/', (req, res) => {
  res.render('proposta'); 
});

router.post('/', submitProposta);

export default router;
