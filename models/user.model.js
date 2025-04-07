import config from '../config/config.js';
import bcrypt from 'bcryptjs';
import { createConnection, checkConnection, executeQuery, closeConnection } from '../config/database.js';


// Find user by email or username
const findUserByEmail = async (pool, email) => {
  const sql = `SELECT * FROM users WHERE email = ? `;  
  const results = await executeQuery(pool, sql, [email]);
  return results[0] || null;
};

// Create a new user
const createUser = async (userData) => {
  const pool = createConnection();
  try {
    const { name, email, password, role = 'user' } = userData;

    const isConnected = await checkConnection(pool);
    if (!isConnected) {
        throw new Error('Database connection failed');
    }

    const existingUser = await findUserByEmail(pool, email);

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = `INSERT INTO users (name, email, password, role)  VALUES (?, ?, ?, ?)`;
    const params = [name, email, hashedPassword, role];

    const result = await executeQuery( pool, sql, params);

    return {
      success: true,
      userId: result.insertId,
      message: 'User created successfully'
    };


  } catch (error) {
    console.error('User creation error:', error);
            

    if (error.message.includes('Database connection failed')) {
        return {
            success: false,
            message: 'Database connection error. Please try again later.'
        };
    }

    return {
        success: false,
        message: error.message || 'Failed to create user'
    };
  } finally {    
    await closeConnection(pool);
  }


};


// Check User Email
const getUserByEmail = async (userData) => {
  const pool = createConnection();
  try {
    const { email } = userData;

    const checkUser = await findUserByEmail(pool, email);
    if (!checkUser) {
      throw new Error('Email Not Found!');
    }
    return checkUser;
  } catch (error) {
    console.error('Failed to check user!', error);
  } finally {    
    await closeConnection(pool);
  }
};




export default { findUserByEmail, createUser, getUserByEmail };