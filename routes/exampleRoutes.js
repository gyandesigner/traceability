import express from 'express';
import exampleController from '../controllers/exampleController.js';

const router = express.Router();

// Example routes
router.get('/users', exampleController.getAllUsersExample);
router.get('/users/:userId', exampleController.getUserByIdExample);
router.post('/users', exampleController.createUserExample);
router.put('/users/:userId', exampleController.updateUserExample);
router.delete('/users/:userId', exampleController.deleteUserExample);

// Authentication examples
router.post('/login', exampleController.loginExample);

// Complex operation example
router.post('/complex-operation', exampleController.complexOperationExample);

export default router; 