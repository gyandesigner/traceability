import express from 'express';
const router = express.Router();
import authRoutes from "./auth.js";
import dashboardRoutes from "./dashboard.js";

router.use('/', authRoutes);
router.use('/', dashboardRoutes);

export default router;
