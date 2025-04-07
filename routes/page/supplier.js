import express from 'express';
const router = express.Router();
import authenticateToken from "../../middleware/authMiddleware.js";
import supplierController from '../../controllers/pages/supplierController.js';

router.get('/supplier', supplierController.getSupplierListPage);
router.get('/supplier/add', supplierController.getAddSupplierListPage);


export default router;