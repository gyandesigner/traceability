import apiHelper from '../helper/apiHelper.js';

const getLatestSupplier = async (length) => {
    try {
        const apiUrl = `/get-recent-supplier/${length}`;
        return await apiHelper.get(apiUrl);
    } catch (error) {
        console.error('Error fetching latest facilities:', error);
        return [];
    }
}
const getSupplierCount = async () => {
    try {
        const apiUrl = `/get-supplier-count`;
        return await apiHelper.get(apiUrl);
    } catch (error) {
        console.error('Error fetching supplier count:', error);
        return 0;
    }
}

export default {
    getLatestSupplier,
    getSupplierCount,
};