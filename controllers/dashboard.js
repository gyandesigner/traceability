import { fetchFacilityData, deleteFacility, addNewFacility } from '../models/facilityMaster.model.js';


const dashboardPage = async (req,res) => {
    console.log("dashboard page")
    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    model.title = 'Dashboard | Tracibility';
    model.layout = 'layouts/dashboard-layout';
    res.render('dashboard/dashboard', model);
}
const logoutPage = async (req,res) => {
    console.log("cas")
    res.clearCookie('jwt');
    res.redirect('/login'); 
}

const facilityMasterPage = async (req, res) => {
    const model = {
        title: '',
        layout: 'layouts/layout',
        facility_master: []
    }
    model.title = 'Facility Master | Tracibility';

    try { 

        const facilityRes = await fetch('http://localhost:5500/get-facility-master', { method: 'POST' }); 
        console.log(facilityRes)
        console.log("facilityRes")

        if (!facilityRes.ok) {
            model.facility_master = [];
        }
        const facilityData = await facilityRes.json();

        model.facility_master = facilityData.data;
        
    } catch (error) {
        model.facility_master = [];
    }

    model.layout = 'layouts/dashboard-layout';
    res.render('facilityMaster/facilityMaster', model);

}

const getFacilityMaster = async (req, res) => {
    try {
      
        const result = await fetchFacilityData();
       
        res.json({ success: true, data: result });

    } catch (error) {
        console.error('Facility data fetch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const deleteFacilityById = async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const result = await deleteFacility(idToDelete);

        if (result.success) {
            res.json({ success: true, message: result.message }); // Use the message from deleteFacility
        } else {
            res.status(404).json({ success: false, message: result.message }); // Use the message from deleteFacility
        }

    } catch (error) {
        console.error('Error deleting facility:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const addFacility = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ message: 'Id and Name are required' });
        }
        const result = await addNewFacility(req.body);

        if (result.success) {
            res.json({ success: true, message: result.message }); // Use the message from deleteFacility
        } else {
            res.status(404).json({ success: false, message: result.message }); // Use the message from deleteFacility
        }

    } catch (error) {
        console.error('Error deleting facility:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}






export { dashboardPage, logoutPage, facilityMasterPage, getFacilityMaster, deleteFacilityById, addFacility };