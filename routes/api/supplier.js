import express from 'express';;
const router = express.Router();
import supplierController from "../../controllers/api/supplierController.js";

router.post('/get-all-supplier', supplierController.getAllSupplierList);
router.post('/add-supplier', supplierController.addSupplier);
router.get('/get-recent-supplier/:length', supplierController.getRecentSupplier);
router.get('/get-supplier-count', supplierController.getSupplierCount);

export default router;


