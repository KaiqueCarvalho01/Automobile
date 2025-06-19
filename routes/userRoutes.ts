import { Router } from 'express';
import { registerUser, getMe } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router(); 

router.post('/', registerUser);
router.get('/me', protect, getMe);

export default router;