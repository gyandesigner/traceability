import XLSX from 'xlsx';
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
        const { name, address, country, state, city, mobile, email, agent, registrationId, facility, status } = req.body;
        if (!name || !address || !country || !state || !city || !mobile || !email || !agent || !facility || !status) {
            return res.status(400).json({ message: 'Important filds are required' });
        }
        if(!req.user) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!req.user.u_id || !req.user.u_name || !req.user.u_email) {
            console.log('User data not found in request');
            return res.status(401).json({ message: 'User data not found in request' });
        }        
        let userId = req.user.u_id;
        let userName = req.user.u_name;
        let userEmail = req.user.u_email;
        const supplierData = { name, address, country, state, city, mobile, email, agent, status, registrationId, facility, userId, userName, userEmail };
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
const deleteSupplier = async (req, res) => {
    try {      
        const id = req.params.id;        
        if (!id) {
            return res.status(400).json({ message: 'Supplier ID is required' });
        }        
        const result = await supplierModel.deleteSupplier(id);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getSupplierById = async (req, res) => {
    try {      
        const id = req.params.id;        
        if (!id) {
            return res.status(400).json({ message: 'Supplier ID is required' });
        }        
        const result = await supplierModel.fetchSupplierById(id);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const updateSupplier = async (req, res) => {
    try {      
        const _id = req.params.id;     
        if (!_id) {
            return res.status(400).json({ message: 'Supplier ID is required' });
        }        
        const { name, address, country, state, city, mobile, email, agent, registrationId, status, facility } = req.body;
        if (!name || !address || !country || !state || !city || !mobile || !email || !agent || !facility || !status ) {
            return res.status(400).json({ message: 'Important filds are required' });
        }
        const supplierData = { name, address, country, state, city, mobile, email, agent, registrationId, status, facility };
        const result = await supplierModel.updateSupplier(_id, supplierData);       
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const uploadSupplier = async (req, res) => {
    console.log("-------------- Upload Supplier Data--------------");
    try {      
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'File is required' });
        }
        if(!req.user) {
            console.log('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!req.user.u_id || !req.user.u_name || !req.user.u_email) {
            console.log('User data not found in request');
            return res.status(401).json({ message: 'User data not found in request' });
        }     
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const updatedJsonData = jsonData.map(item => {
            return {
                ...item,
                creator_id: req.user.u_id,
                creator_name: req.user.u_name,
                creator_email: req.user.u_email
            };
        });

        const result = await supplierModel.uploadSupplier(updatedJsonData);

        console.log('Upload result:', result);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Supplier error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default { getAllSupplierList, addSupplier, getRecentSupplier, getSupplierCount, deleteSupplier, getSupplierById, updateSupplier, uploadSupplier }