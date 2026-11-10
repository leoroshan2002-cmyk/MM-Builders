import { Router } from 'express';
import { getConcepts } from '../controllers/conceptController.js';

const router = Router();
router.get('/', getConcepts);
export default router;
