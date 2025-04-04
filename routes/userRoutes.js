const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.loginPage);
router.post('/user-login', userController.userLogin);




module.exports = router;
