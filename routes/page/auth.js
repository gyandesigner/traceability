import express from 'express';
import authController from "../../controllers/pages/authController.js";

const router = express.Router();

router.get('/', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.get('/logout', authController.getLogoutPage);



export default router;