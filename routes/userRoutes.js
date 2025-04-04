import express from 'express';
import * as loginUser from '../controllers/loginUser.js';
import * as registerUser from '../controllers/registerUser.js';

const router = express.Router();

router.get('/login', loginUser.loginPage);
router.post('/user-login', loginUser.userLogin);


router.get('/register', registerUser.registerPage);
router.post('/create-user', registerUser.createUser);




export default router;
