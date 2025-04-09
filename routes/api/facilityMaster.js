import express from 'express';;
const router = express.Router();
import facilityController from "../../controllers/api/facilityMasterController.js";

router.get('/get-all-facility', facilityController.getAllFacility);
router.get('/get-recent-facility/:length', facilityController.getRecentFacility);
router.get('/get-facility-count', facilityController.getFacilityCount);
router.get('/delete-facility/:id', facilityController.deleteFacilityById);
router.post('/add-facility', facilityController.addFacility);


export default router;


