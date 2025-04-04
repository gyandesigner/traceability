const mysql = require('mysql2/promise');
const config = require('../config/config');
// const bcrypt = require('bcryptjs');


const { databaseMySQL } = config;

const pool = mysql.createPool(databaseMySQL);

const findByEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}


async function createUser(email, password, role) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = { findByEmail, createUser };