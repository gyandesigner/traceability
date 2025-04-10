import { createConnection, executeQuery, closeConnection } from '../config/database.js';

const fetchFacilityData = async () => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facilitymaster`;  
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
    const sql = `SELECT * FROM facilitymaster WHERE _id = ?`;
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
    console.log('deleteFacilityById', id, facilityExists);
    if (!facilityExists) {
      return { success: false, message: 'Facility not found' };
    }
    const sqlDelete = `DELETE FROM facilitymaster WHERE _id = ?`;
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
    const { identifier, name, status } = userData;
    const sql = `INSERT INTO facilitymaster (identifier, name, status) VALUES (?, ?, ?)`;
    const params = [identifier, name, status];
    const result = await executeQuery( pool, sql, params);
    return { success: true, message: 'Facility added successfully', insertId: result.insertId };
  } catch (error) {
    throw new Error(error.message || 'Failed to add facility!');
  } finally {    
    await closeConnection(pool);
  }
}

const fetchRecentFacilityData = async (length) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facilitymaster ORDER BY _id DESC LIMIT ?`;
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
    const sql = `SELECT COUNT(*) AS count FROM facilitymaster`;
    const result = await executeQuery( pool, sql);
    return result[0].count;
  } catch (error) {
    console.error('Failed to fetch facility count!', error);
  } finally {    
    await closeConnection(pool);
  }
}
const updateFacilityById = async (id, userData) => {
  const pool = createConnection();
  try {
    const { identifier, name, status } = userData;
    console.log('updateFacilityById called', id, userData);
    const facilityExists = await _checkFacilityExists(id);
    if (!facilityExists) {
      return { success: false, message: 'Facility not found' };
    }
    const sql = `UPDATE facilitymaster SET identifier = ?, name = ?, status = ? WHERE _id = ?`;
    const params = [identifier, name, status, id];
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