const getFacilityMasterPage = async (req,res) => {
    console.log("--------------Facility Master Page--------------");
    
    const model = {
        title: '',
        layout: 'layouts/layout',
        facility_master: []
    }
    model.title = 'Facility Master | Tracibility';

    try { 

        const facilityRes = await fetch('http://localhost:5600/api/get-all-facility', { method: 'POST' }); 
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

export default { getFacilityMasterPage };