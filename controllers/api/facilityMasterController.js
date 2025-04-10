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
const getRecentFacility = async (req, res) => {
    try {      
        const length = parseInt(req.params.length, 10);
        if (isNaN(length) || length <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid length parameter' });
        }
        const result = await facilityModel.fetchRecentFacilityData(length);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getFacilityCount = async (req, res) => {
    try {      
        const result = await facilityModel.fetchFacilityCount();       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Facility count fetch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const addFacility = async (req, res) => {
    try {      
        const { id, name, status } = req.body;
        if (!id || !name || !status || id === '' || name === '' || status === '') {
            return res.status(400).json({ message: 'Important filds are required' });
        }
        let identifier = id;
        const facilityData = { identifier, name, status };
        const result = await facilityModel.addNewFacility(facilityData);  
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error || 'Internal server error' });
    }
}
const deleteFacilityById = async (req, res) => {
    try {      
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Facility id is required' });
        }
        const result = await facilityModel.deleteFacilityById(id);  
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error || 'Internal server error' });
    }
}

const updateFacilityById = async (req, res) => {
    try {      
        console.log('updateFacilityById called');
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'Facility id is required' });
        }
        const { identifier, name, status } = req.body;
        if (!identifier || !name || !status || identifier === '' || name === '' || status === '') {
            return res.status(400).json({ message: 'Important filds are required' });
        }
        const facilityData = { identifier, name, status };
        const result = await facilityModel.updateFacilityById(id, facilityData);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error || 'Internal server error' });
    }
}


export default { getAllFacility, getRecentFacility, getFacilityCount, addFacility, deleteFacilityById, updateFacilityById }