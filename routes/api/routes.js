import express from 'express';
const router = express.Router();
import authRoutes from "./auth.js";
import facilityMaster from './facilityMaster.js';
import supplier from './supplier.js';

router.use('/', authRoutes);
router.use('/', facilityMaster);
router.use('/', supplier);

export default router;
