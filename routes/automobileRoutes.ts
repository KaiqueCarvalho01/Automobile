import { Router } from 'express'; 
import { 
    getAutomobiles, 
    setAutomobile, 
    updateAutomobile, 
    deleteAutomobile 
} from '../controllers/automobileController';
import { protect } from '../middleware/authMiddleware';

const router = Router(); 

router.route('/').get(protect, getAutomobiles).post(protect, setAutomobile);
router.route('/:id').put(protect, updateAutomobile).delete(protect, deleteAutomobile);

export default router;