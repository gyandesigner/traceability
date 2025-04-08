import express from 'express';
const router = express.Router();
import userAuth from "../../middleware/authMiddleware.js";
import dashoard from "../../controllers/pages/dashoardController.js";
import facility from '../../controllers/pages/facilityController.js';
import supplier from '../../controllers/pages/supplierController.js';


router.get('/dashboard', userAuth, dashoard.getDashboardPage);
router.get('/facility', userAuth, facility.getFacilityMasterPage);
router.get('/supplier', supplier.getSupplierListPage);
router.get('/supplier/add', supplier.getAddSupplierListPage);
router.get('/supplier', supplier.getSupplierListPage);
router.get('/supplier/add', supplier.getAddSupplierListPage);


export default router;