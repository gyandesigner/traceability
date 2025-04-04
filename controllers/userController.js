const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/config');
const bcrypt = require('bcryptjs');


const loginPage = async (req,res) => {

    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    
    model.title = 'Login | CRMS';
    model.layout = 'layouts/login-layout';

    res.render('login', model);
}
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    res.json({ success: true, });
     
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);


        console.log(password, user.password)
        console.log("password, user.password")

        console.log(isMatch)
        console.log("XXXXXXXXXXXXXXXXXXisMatch")


        if (!isMatch) {
            throw new Error('Invalid credentials');
        }







    
        const token = jwt.sign( { userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' } );
    
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ success: true, token });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}


module.exports = { loginPage, userLogin };