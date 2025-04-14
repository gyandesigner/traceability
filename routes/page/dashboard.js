import express from 'express';
import dashoard from "../../controllers/pages/dashoardController.js";
import facility from '../../controllers/pages/facilityController.js';
import supplier from '../../controllers/pages/supplierController.js';
import authenticateToken from '../../middleware/authMiddleware.js';

const router = express.Router();

/*
 * Dashboard Routes
 */
router.get('/dashboard', dashoard.getDashboardPage);
/*
 * Facility Routes
 */
router.get('/facility', facility.getFacilityMasterPage);


/**
 * Supplier Routes
 */
router.get('/supplier', supplier.getSupplierListPage);
router.get('/supplier/add', supplier.getAddSupplierListPage);
router.get('/supplier', supplier.getSupplierListPage);
router.get('/supplier/add', supplier.getAddSupplierListPage);
router.get('/supplier/edit/:supplierId', supplier.updateSupplierPage);
router.get('/supplier/edit/:supplierId', supplier.updateSupplierPage);
router.get('/supplier/upload', supplier.getSupplierUploadPage);


export default router;