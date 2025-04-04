import mysql from 'mysql2/promise';
import config from './config.js';

const createConnection = () => {
    const { databaseMySQL } = config;
    
    return mysql.createPool({
        ...databaseMySQL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};

const checkConnection = async (pool) => {
    try {
        const connection = await pool.getConnection();
        
        try {
            await connection.query('SELECT 1');
            return true;
        } catch (queryError) {
            console.error('Error executing test query:', queryError);
            return false;
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error('Failed to establish database connection:', connectionError);
        return false;
    }
};


const executeQuery = async (pool, sql, params = []) => {
    const isConnected = await checkConnection(pool);
    
    if (!isConnected) {
        throw new Error('Database connection failed');
    }
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database Query Error:', error);
        throw error;
    }
};


const closeConnection = async (pool) => {
    try {
        await pool.end();
        console.log('Database connection pool closed');
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
};

export { createConnection, checkConnection, executeQuery, closeConnection };