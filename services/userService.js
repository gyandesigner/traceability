import apiHelper from '../helper/apiHelper.js';

/**
 * User Service - Handles all user-related API operations
 */

/**
 * Get all users
 * @returns {Promise<Array>} - List of users
 */
export async function getAllUsers() {
    try {
        return await apiHelper.get('/users');
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

/**
 * Get user by ID
 * @param {string|number} userId - User ID
 * @returns {Promise<Object>} - User object
 */
export async function getUserById(userId) {
    try {
        return await apiHelper.get(`/users/${userId}`);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
}

/**
 * Create a new user
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} - Created user object
 */
export async function createUser(userData) {
    try {
        return await apiHelper.post('/users', userData);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

/**
 * Update a user
 * @param {string|number} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user object
 */
export async function updateUser(userId, userData) {
    try {
        return await apiHelper.put(`/users/${userId}`, userData);
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
}

/**
 * Delete a user
 * @param {string|number} userId - User ID
 * @returns {Promise<Object>} - Deletion result
 */
export async function deleteUser(userId) {
    try {
        return await apiHelper.delete(`/users/${userId}`);
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
}

/**
 * Authenticate user
 * @param {Object} credentials - User credentials (email, password)
 * @returns {Promise<Object>} - Authentication result with token
 */
export async function authenticateUser(credentials) {
    try {
        const response = await apiHelper.post('/auth/login', credentials);
        
        // Set the auth token for future requests
        if (response && response.token) {
            apiHelper.setAuthToken(response.token);
        }
        
        return response;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}

/**
 * Logout user
 * @returns {Promise<Object>} - Logout result
 */
export async function logoutUser() {
    try {
        const response = await apiHelper.post('/auth/logout');
        
        // Clear the auth token
        apiHelper.setAuthToken(null);
        
        return response;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
}

// Export all functions as default object
export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    logoutUser
}; 