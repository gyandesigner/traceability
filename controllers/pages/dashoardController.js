import facilityService from '../../services/facilityServices.js';
import supplierServices from '../../services/supplierServices.js';


const getDashboardPage = async (req,res) => {
    console.log("--------------Dashboard Page--------------");
    try{
        console.time('dashboardPage === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            facility_data: [],
            facility_count: 0,
            supplier_data: [],
            supplier_count: [],
        }
        const facilityRes = await facilityService.getLatestFacility(5);
        console.log('facilityRes === > ', facilityRes);
        if(facilityRes && facilityRes.data) {
            model.facility_data = facilityRes.data;
        }
        const facilityCountRes = await facilityService.getFacilityCount();
        if(facilityCountRes && facilityCountRes.data) {
            model.facility_count = facilityCountRes.data;
        }
        const supplierRes = await supplierServices.getLatestSupplier(5);
        if(supplierRes && supplierRes.data) {
            model.supplier_data = supplierRes.data;
        }
        const supplierCountRes = await supplierServices.getSupplierCount();
        if(supplierCountRes && supplierCountRes.data) {
            model.supplier_count = supplierCountRes.data;
        }
        model.title = 'Dashboard | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        console.timeEnd('dashboardPage === > ');
        res.render('dashboard/dashboard', model);
    } catch(error) {
        console.log(error);
    }
}
export default { getDashboardPage };