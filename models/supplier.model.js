import { createConnection, executeQuery, closeConnection } from '../config/database.js';


const fetchSupplierData = async () => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM supplier_data`;  
    const result = await executeQuery( pool, sql);
    return result;
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
};

const addSupplier = async (supplier) => {
  const pool = createConnection();
  try {
    const { name, address, country, state, city, mobile, email, agent, facility } = supplier;
    const sql = `INSERT INTO supplier_data (name, address, country, state, city, mobile, email, agent, facility) VALUES (?, ?, ?,?, ?, ?,?, ?, ?)`;
    const params = [name, address, country, state, city, mobile, email, agent, facility];
    const result = await executeQuery( pool, sql, params);

    return { success: true, message: 'Suplier added successfully', insertId: result.insertId };
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}

const fetchRecentSupplierData = async (length) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM supplier_data ORDER BY id DESC LIMIT ?`;
    const params = [`${length}`];
    const result = await executeQuery( pool, sql, params);
    return result;
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}

const fetchSupplierCount = async () => {
  const pool = createConnection();
  try {
    const sql = `SELECT COUNT(*) as count FROM supplier_data`;
    const result = await executeQuery( pool, sql);
    return result[0].count;
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}

export default { fetchSupplierData, addSupplier, fetchRecentSupplierData, fetchSupplierCount };