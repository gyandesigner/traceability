import express from 'express';;
const router = express.Router();
import facilityMasterController from "../../controllers/api/facilityMasterController.js";

router.post('/get-all-facility', facilityMasterController.getAllFacility);
// router.post('/delete-facility/:id', dashboard.deleteFacilityById);
// router.post('/add-facility', dashboard.addFacility);


export default router;


