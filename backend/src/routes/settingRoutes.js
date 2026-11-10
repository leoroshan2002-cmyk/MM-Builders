import { Router } from 'express';
import { getSettings } from '../controllers/settingController.js';

const router = Router();
router.get('/', getSettings);
export default router;
