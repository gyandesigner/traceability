import express from 'express';
const router = express.Router();
import authenticateToken from "../../middleware/authMiddleware.js";
import dashoardController from "../../controllers/pages/dashoardController.js";
import facilityMaster from '../../controllers/pages/facilityMaster.js';



router.get('/dashboard', authenticateToken, dashoardController.getDashboardPage);
router.get('/facility-master', authenticateToken, facilityMaster.getFacilityMasterPage);

export default router;