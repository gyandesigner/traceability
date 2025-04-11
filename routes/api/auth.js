import express from 'express';;
const router = express.Router();
import authController from "../../controllers/api/authController.js";

router.post('/user-login', authController.userLogin);
router.post('/create-user', authController.createUser);


export default router;