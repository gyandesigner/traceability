import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// User routes
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

// Authentication routes
router.post('/login', userController.login);
router.post('/logout', userController.logout);

export default router; 