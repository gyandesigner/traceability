import express from 'express';
import authRoutes from "./auth.js";
import facilityMaster from './facilityMaster.js';
import supplier from './supplier.js';
import authenticateToken from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', facilityMaster);
router.use('/', supplier);

export default router;
