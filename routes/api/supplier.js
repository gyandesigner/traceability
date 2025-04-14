import express from 'express';;
import multer from 'multer';
import supplierController from "../../controllers/api/supplierController.js";
import authenticateToken from '../../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }); 

router.post('/add-supplier', supplierController.addSupplier);
router.get('/get-all-supplier', supplierController.getAllSupplierList);
router.get('/get-recent-supplier/:length', supplierController.getRecentSupplier);
router.get('/get-supplier-count', supplierController.getSupplierCount);
router.get('/delete-supplier/:id', supplierController.deleteSupplier);
router.get('/get-supplier/:id', supplierController.getSupplierById);
router.post('/update-supplier/:id', supplierController.updateSupplier);
router.post('/upload-supplier', authenticateToken, upload.single('excelFile'), supplierController.uploadSupplier);




export default router;


