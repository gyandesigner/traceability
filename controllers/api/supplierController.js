import supplierModel from '../../models/supplier.model.js';

const getAllSupplierList = async (req, res) => {
    try {      
        const result = await supplierModel.fetchSupplierData();       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const addSupplier = async (req, res) => {
    try {      
        const { name, address, country, state, city, mobile, email, agent, facility } = req.body;
        if (!name || !address || !country || !state || !city || !mobile || !email || !agent || !facility) {
            return res.status(400).json({ message: 'Important filds are required' });
        }
        const supplierData = { name, address, country, state, city, mobile, email, agent, facility }
        const result = await supplierModel.addSupplier(supplierData);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getRecentSupplier = async (req, res) => {
    try {      
        const length = parseInt(req.params.length, 10);
        if (isNaN(length) || length <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid length parameter' });
        }
        const result = await supplierModel.fetchRecentSupplierData(length);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getSupplierCount = async (req, res) => {
    try {      
        const result = await supplierModel.fetchSupplierCount();       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default { getAllSupplierList, addSupplier, getRecentSupplier, getSupplierCount }