import facilityServices from '../../services/facilityServices.js';

const getFacilityMasterPage = async (req,res) => {
    console.log("--------------Facility Master Page--------------");
    try{
        console.time('facilityPage === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            facility_data: [],
        }
        const facilityRes = await facilityServices.getAllFacility();
        if(facilityRes && facilityRes.data) {
            facilityRes.data.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            })
            model.facility_data = facilityRes.data;
        }
        model.title = 'Facility Master | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        console.timeEnd('facilityPage === > ');
        res.render('facilityMaster/facilityMaster', model);
    } catch(error) {
        console.log(error);
    }
}

export default { getFacilityMasterPage };