import express from 'express';;
const router = express.Router();
import supplierController from "../../controllers/api/supplierController.js";
import authenticateToken from '../../middleware/authMiddleware.js';

router.post('/add-supplier', authenticateToken, supplierController.addSupplier);
router.get('/get-all-supplier', supplierController.getAllSupplierList);
router.get('/get-recent-supplier/:length', supplierController.getRecentSupplier);
router.get('/get-supplier-count', supplierController.getSupplierCount);

export default router;


