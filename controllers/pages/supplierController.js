import facilityServices from '../../services/facilityServices.js';
import supplierServices from '../../services/supplierServices.js';


const getSupplierListPage = async (req,res) => {
    console.log("--------------Supplier List Page--------------");

    console.log("-------------- Add Supplier Page--------------");
    try{
        console.time('addFacility === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            supplier_data: []
        }
        const supplierRes = await supplierServices.getAllSupplier();
        console.log("supplierRes === > ", supplierRes);
        if(supplierRes && supplierRes.data) {
            model.supplier_data = supplierRes.data;
        } 
        
        model.title = 'Supplier List | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        
        console.timeEnd('addFacility === > ');
    res.render('supplier/supplierList', model);

    } catch(error) {
        console.log(error);
    }


    
}

const getAddSupplierListPage = async (req,res) => {
    console.log("-------------- Add Supplier Page--------------");
    try{
        console.time('addFacility === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            facility_master: []
        }
        const facilityRes = await facilityServices.getAllFacility();
        if(facilityRes && facilityRes.data) {
            model.facility_master = facilityRes.data;
        }
        
        model.title = 'Add Supplier | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        
        console.timeEnd('addFacility === > ');
        res.render('supplier/addSupplier', model);
    } catch(error) {
        console.log(error);
    }
}

const updateSupplierPage = async (req,res) => {
    console.log("-------------- Add Supplier Page--------------");
    try{
        console.time('updateSupplier === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            supplier: [],
            facility_master: []
        }
        const supplierId = req.params.supplierId;
        console.log("supplierId === > ", supplierId);
        const supplierRes = await supplierServices.getSupplierById(supplierId);
        console.log(supplierRes, "supplierRes === > ");
        if(supplierRes && supplierRes.data) {
            model.supplier = supplierRes.data;
        }
        const facilityRes = await facilityServices.getAllFacility();
        if(facilityRes && facilityRes.data) {
            model.facility_master = facilityRes.data;
        }
        
        model.title = 'Edit Supplier | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        
        console.timeEnd('updateSupplier === > ');
        res.render('supplier/updateSupplier', model);
    } catch(error) {
        console.log(error);
    }
}

export default { getSupplierListPage, getAddSupplierListPage, updateSupplierPage };