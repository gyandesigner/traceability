import apiHelper from '../helper/apiHelper.js';

const getAllFacility = async () => {
    try {
        const apiUrl = '/get-all-facility';
        return await apiHelper.get(apiUrl);
    } catch (error) {
        console.error('Error fetching all facilities:');
        return false;
    }
}

const getLatestFacility = async (length) => {
    try {
        const apiUrl = `/get-recent-facility/${length}`;
        return await apiHelper.get(apiUrl);
    } catch (error) {
        console.error('Error fetching latest facilities:');
        return [];
    }
}
const getFacilityCount = async () => {
    try {
        const apiUrl = `/get-facility-count`;
        return await apiHelper.get(apiUrl);
    } catch (error) {
        console.error('Error fetching facility count:', error);
        return false;
    }
}

export default {
    getAllFacility,
    getLatestFacility,
    getFacilityCount,
};
