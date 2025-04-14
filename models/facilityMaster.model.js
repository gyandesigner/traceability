import { createConnection, executeQuery, closeConnection } from '../config/database.js';

const fetchFacilityData = async () => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facility_data`;  
    const result = await executeQuery( pool, sql);
    return result;
  } catch (error) {
    console.error('Failed to fetch facility data!', error);
  } finally {    
    await closeConnection(pool);
  }
};
const _checkFacilityExists = async (id) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facility_data WHERE _id = ?`;
    const params = [`${id}`];
    const result = await executeQuery( pool, sql, params);
    console.log('checkFacilityExists', result);
    return result.length > 0; 
  } catch (error) {
    console.error('Error checking facility existence!', error);
  } finally {    
    await closeConnection(pool);
  }
}

const deleteFacilityById = async (id) =>  {
  const pool = createConnection();
  try {
    const facilityExists = await _checkFacilityExists(id);
    if (!facilityExists) {
      return { success: false, message: 'Facility not found' };
    }
    const sqlDelete = `DELETE FROM facility_data WHERE _id = ?`;
    const paramsDelete = [`${id}`];
    const resultDelete = await executeQuery( pool, sqlDelete, paramsDelete);
    if (resultDelete.affectedRows === 0) {
      return { success: false, message: 'Facility not found' };
    }
    return { success: true, message: 'Facility deleted successfully' };    
  } catch (error) {
    console.error('Error deleting facility!', error);
  } finally {    
    await closeConnection(pool);
  }
}


const addNewFacility = async (userData)  => {
  const pool = createConnection();
  try {
    const { id, name, status, userId, userName, userEmail } = userData;
    if (!id || !name || !status || id === '' || name === '' || status === '') {
      return { success: false, message: 'Important fields are required' };
    }
    const sql = `INSERT INTO facility_data (id, name, status, creater_id, creater_name, creater_email) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [id, name, status, userId, userName, userEmail];
    const result = await executeQuery( pool, sql, params);
    return { success: true, message: 'Facility added successfully', insertId: result.insertId };
  } catch (error) {
    console.error('Error adding facility!', error);
    throw new Error(error.message || 'Failed to add facility!');
  } finally {    
    await closeConnection(pool);
  }
}

const fetchRecentFacilityData = async (length) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facility_data ORDER BY _id DESC LIMIT ?`;
    const params = [`${length}`];
    const result = await executeQuery( pool, sql, params);
    return result;
  } catch (error) {
    throw new Error('Failed to fetch recent facility data!');
  } finally {    
    await closeConnection(pool);
  } 
}

const fetchFacilityCount = async () => {
  const pool = createConnection();
  try {
    const sql = `SELECT COUNT(*) AS count FROM facility_data`;
    const result = await executeQuery( pool, sql);
    return result[0].count;
  } catch (error) {
    console.error('Failed to fetch facility count!', error);
  } finally {    
    await closeConnection(pool);
  }
}
const updateFacilityById = async (_id, userData) => {
  const pool = createConnection();
  try {
    const { id, name, status } = userData;
    const facilityExists = await _checkFacilityExists(_id);
    if (!facilityExists) {
      return { success: false, message: 'Facility not found' };
    }
    const sql = `UPDATE facility_data SET id = ?, name = ?, status = ? WHERE _id = ?`;
    const rowId = `${_id}`;
    const params = [id, name, status, rowId];
    const result = await executeQuery( pool, sql, params);
    if (result.affectedRows === 0) {
      return { success: false, message: 'Facility not found' };
    }
    if (result.changedRows === 0) {
      return { success: false, message: 'No changes made to the facility' };
    }
    return { success: true, message: 'Facility updated successfully' };
  } catch (error) {
    console.error('Error updating facility!', error);
    throw new Error(error.message || 'Failed to update facility!');
  } finally {    
    await closeConnection(pool);
  }
}


export default { fetchFacilityData, deleteFacilityById, addNewFacility, fetchRecentFacilityData, fetchFacilityCount, updateFacilityById };