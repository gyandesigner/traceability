import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/user.model.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs';


const loginPage = async (req,res) => {
    if (req.cookies.jwt) { // Manual cookie check
        return res.redirect('/dashboard');
    }
    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    model.title = 'Login | Tracibility';
    model.layout = 'layouts/login-layout';
    res.render('login', model);
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const userData = {email};
        const user = await getUserByEmail(userData);
        if (!user) {
            return res.status(401).json({ message: 'Email not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
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

export { loginPage, userLogin };