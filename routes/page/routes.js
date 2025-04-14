import express from 'express';
import authRoutes from "./auth.js";
import dashboardRoutes from "./dashboard.js";
import authenticateToken from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', authenticateToken, dashboardRoutes);

export default router;
