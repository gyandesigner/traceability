import { createConnection, executeQuery, closeConnection } from '../config/database.js';


const fetchFacilityData = async (userData) => {
  const pool = createConnection();
  try {
    const sql = `SELECT * FROM facilityMaster`;  
    const result = await executeQuery( pool, sql);

    return result;
  } catch (error) {
    console.error('Failed to check user!', error);
  } finally {    
    await closeConnection(pool);
  }
};


async function deleteFacility(id) {
  const pool = createConnection();
  try {


    const sql = `DELETE FROM facilityMaster WHERE id = ?`;
    const params = [id];
    const result = await executeQuery( pool, sql, params);


    // Check if a row was actually deleted
    if (result.affectedRows === 0) {
      return { success: false, message: 'Facility not found' };
    }
    return { success: true, message: 'Facility deleted successfully' };
  } catch (error) {
    console.error('Error deleting facility!', error);
  } finally {    
    await closeConnection(pool);
  }
}


async function addNewFacility(userData) {
  const pool = createConnection();
  try {

    const { name, id, status = 'active' } = userData;

    const sql = `INSERT INTO facilityMaster (name, identifier, status) VALUES (?, ?, ?)`;
    const params = [name, id, status];
    const result = await executeQuery( pool, sql, params);

    return { success: true, message: 'Facility added successfully', insertId: result.insertId };
  } catch (error) {
    console.error('Error adding facility!', error);
  } finally {    
    await closeConnection(pool);
  }
}

export { fetchFacilityData, deleteFacility, addNewFacility };