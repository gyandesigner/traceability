import express from 'express';;
const router = express.Router();
import facilityController from "../../controllers/api/facilityMasterController.js";
import authenticateToken from '../../middleware/authMiddleware.js';

router.get('/get-all-facility', facilityController.getAllFacility);
router.get('/get-recent-facility/:length', facilityController.getRecentFacility);
router.get('/get-facility-count', facilityController.getFacilityCount);
router.post('/add-facility', authenticateToken, facilityController.addFacility);
router.post('/update-facility/:id', facilityController.updateFacilityById);
router.get('/delete-facility/:id', facilityController.deleteFacilityById);


export default router;


