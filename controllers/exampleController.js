import userService from '../services/userService.js';

export async function getAllUsersExample(req, res, next) {
    try {
        // Simple call to the service function
        const users = await userService.getAllUsers();
        
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserByIdExample(req, res, next) {
    try {
        const { userId } = req.params;        
        const user = await userService.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export async function createUserExample(req, res, next) {
    try {
        // Extract data from request body
        const userData = req.body;
        
        // Pass data to service function
        const newUser = await userService.createUser(userData);
        
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}
export async function updateUserExample(req, res, next) {
    try {
        // Extract both parameter and body data
        const { userId } = req.params;
        const userData = req.body;
        
        // Pass both to service function
        const updatedUser = await userService.updateUser(userId, userData);
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
}

export async function loginExample(req, res, next) {
    try {
        
        const { email, password } = req.body;
    
        const authResult = await userService.authenticateUser({ email, password });
        
        res.status(200).json({
            success: true,
            data: authResult
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteUserExample(req, res, next) {
    try {
        const { userId } = req.params;
        
        // Call service function
        await userService.deleteUser(userId);
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        // Custom error handling example
        if (error.message.includes('not found')) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Pass other errors to the error handling middleware
        next(error);
    }
}
export async function complexOperationExample(req, res, next) {
    try {
        // First, authenticate the user
        const { email, password } = req.body;
        const authResult = await userService.authenticateUser({ email, password });
        
        // Then, get the user details
        const user = await userService.getUserById(authResult.userId);
        
        // Finally, update some user information
        const updatedUser = await userService.updateUser(user.id, {
            lastLogin: new Date().toISOString()
        });
        
        res.status(200).json({
            success: true,
            data: {
                auth: authResult,
                user: updatedUser
            }
        });
    } catch (error) {
        next(error);
    }
}

// Export all controller functions as default object
export default {
    getAllUsersExample,
    getUserByIdExample,
    createUserExample,
    updateUserExample,
    loginExample,
    deleteUserExample,
    complexOperationExample
}; 