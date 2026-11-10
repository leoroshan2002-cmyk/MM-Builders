import { Router } from 'express';
import siteRoutes from './siteRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import conceptRoutes from './conceptRoutes.js';
import blueprintRoutes from './blueprintRoutes.js';
import settingRoutes from './settingRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));
router.use('/site', siteRoutes);
router.use('/services', serviceRoutes);
router.use('/concepts', conceptRoutes);
router.use('/blueprints', blueprintRoutes);
router.use('/settings', settingRoutes);
router.use('/enquiries', enquiryRoutes);

export default router;
