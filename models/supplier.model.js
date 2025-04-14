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
    const { name, address, country, state, city, mobile, email, agent, registrationId, facility, userId, userName, userEmail } = supplier;
    const sql = `INSERT INTO supplier_data (name, address, country, state, city, mobile, email, agent_name, registration_id, facility, creator_id, creator_name, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, address, country, state, city, mobile, email, agent, registrationId, facility, userId, userName, userEmail];
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
    const sql = `SELECT * FROM supplier_data ORDER BY _id DESC LIMIT ?`;
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

const deleteSupplier = async (id) => {
  const pool = createConnection();
  try {
    const sql = `DELETE FROM supplier_data WHERE _id = ?`;
    const params = [`${id}`];
    const result = await executeQuery( pool, sql, params);
    return { success: true, message: 'Supplier deleted successfully' };
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}
const fetchSupplierById = async (id) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM supplier_data WHERE _id = ?`;
    const params = [`${id}`];
    const result = await executeQuery( pool, sql, params);
    return result[0];
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}

const updateSupplier = async (_id, supplier) => {
  const pool = createConnection();
  try {
    const { name, address, country, state, city, mobile, email, agent, registrationId, facility } = supplier;
    const sql = `UPDATE supplier_data SET name = ?, address = ?, country = ?, state = ?, city = ?, mobile = ?, email = ?, agent_name = ?, registration_id = ?, facility = ? WHERE _id = ?`;
    const strId = `${_id}`;
    const params = [name, address, country, state, city, mobile, email, agent, registrationId, facility, strId];
    const result = await executeQuery( pool, sql, params);
    return { success: true, message: 'Supplier updated successfully' };
  } catch (error) {
    throw new Error(error)
  } finally {    
    await closeConnection(pool);
  }
}

export default { fetchSupplierData, addSupplier, fetchRecentSupplierData, fetchSupplierCount, deleteSupplier, fetchSupplierById, updateSupplier };