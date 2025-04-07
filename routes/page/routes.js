import express from 'express';
const router = express.Router();
import authRoutes from "./auth.js";
import dashboardRoutes from "./dashboard.js";
import supplierRoutes from "./supplier.js";


router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', supplierRoutes);

export default router;
