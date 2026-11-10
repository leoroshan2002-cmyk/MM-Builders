import { Router } from 'express';
import { getBlueprints } from '../controllers/blueprintController.js';

const router = Router();
router.get('/', getBlueprints);
export default router;
