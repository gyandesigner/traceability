
const getAsnListPage = async (req,res) => {
    console.log("--------------ASN List Page--------------");
    try{
        console.time('asnListPage === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            supplier_data: []
        }
        
        
        
        model.title = 'ASN List | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        
        console.timeEnd('asnListPage === > ');
        res.render('asn/asnList', model);

    } catch(error) {
        console.log(error);
    }    
}

const getAddAsnPage = async (req,res) => {
    console.log("--------------Add ASN Page--------------");
    try{
        console.time('addAsnPage === > ');
        const model = {
            title: '',
            layout: 'layouts/layout',
            supplier_data: []
        }
        
        
        
        model.title = 'Add ASN | Tracibility';
        model.layout = 'layouts/dashboard-layout';
        
        console.timeEnd('addAsnPage === > ');
        res.render('asn/addAsn', model);

    } catch(error) {
        console.log(error);
    }    
}

export default { getAsnListPage, getAddAsnPage };