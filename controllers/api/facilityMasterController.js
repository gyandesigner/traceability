import facilityModel from '../../models/facilityMaster.model.js';

const getAllFacility = async (req, res) => {
    try {      
        const result = await facilityModel.fetchFacilityData();       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Facility data fetch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export default { getAllFacility }