import express from 'express';
import * as dashboard from '../controllers/dashboard.js';
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/dashboard', authenticateToken, dashboard.dashboardPage);
router.get('/facility-master', authenticateToken, dashboard.facilityMasterPage);
router.get('/logout', authenticateToken, dashboard.logoutPage);

router.post('/get-facility-master', dashboard.getFacilityMaster);

router.post('/delete-facility/:id', dashboard.deleteFacilityById);


router.post('/add-facility', dashboard.addFacility);

export default router;
