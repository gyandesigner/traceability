const getSupplierListPage = async (req,res) => {
    console.log("--------------Supplier List Page--------------");
    
    const model = {
        title: '',
        layout: 'layouts/layout',
        supplier_data: []
    }
    model.title = 'Supplier List | Tracibility';

    try { 

        const response = await fetch('http://localhost:5600/api/get-all-supplier', { method: 'POST' }); 

        if (!response.ok) {
            model.supplier_data = [];
        }
        const responseData = await response.json();

        model.supplier_data = responseData.data;
        
    } catch (error) {
        model.supplier_data = [];
    }

    model.layout = 'layouts/dashboard-layout';
    res.render('supplier/supplierList', model);
}

const getAddSupplierListPage = async (req,res) => {
    console.log("-------------- Add Supplier Page--------------");
    
    const model = {
        title: '',
        layout: 'layouts/layout',
        facility_master: []
    }
    model.title = 'Add Supplier | Tracibility';
    

    try { 

        const facilityRes = await fetch('http://localhost:5600/api/get-all-facility', { method: 'POST' }); 

        if (!facilityRes.ok) {
            model.facility_master = [];
        }
        const facilityData = await facilityRes.json();

        model.facility_master = facilityData.data;
        
    } catch (error) {
        model.facility_master = [];
    }



    model.layout = 'layouts/dashboard-layout';
    res.render('supplier/addSupplier', model);
}

export default { getSupplierListPage, getAddSupplierListPage };