import jwt from 'jsonwebtoken';
import userModel from '../../models/user.model.js';
import config from '../../config/config.js';
import bcrypt from 'bcryptjs';


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const userData = { email };
        const checkUser = await userModel.getUserByEmail(userData);
        if (!checkUser.success) {
            return res.status(401).json({ message: checkUser.message });
        }
        const user = checkUser.user;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // More generic message
        }
        console.log("User authenticated Login controller:");
        console.log(user)
        const token = jwt.sign( { u_id: user._id, u_name: user.name, u_email: user.email }, config.jwtSecret, { expiresIn: '1h' } );
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ success: true, token });
    
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userData = {name, email, password};

        try {
            const result = await userModel.createUser(userData);
        
            if (!result.success) {
                
                if (result.message.includes('already exists')) {
                    return res.status(409).json({
                        success: false,
                        message: 'Email already exists',
                        errorType: 'DUPLICATE_EMAIL'
                    });
                }
                
                if (result.message.includes('connection')) {
                    return res.status(503).json({
                        success: false,
                        message: 'Database connection error',
                        errorType: 'DATABASE_CONNECTION_ERROR'
                    });
                }
                
                return res.status(422).json({
                    success: false,
                    message: result.message || 'User creation failed',
                    errorType: 'USER_CREATION_FAILED'
                });
            }
            
            res.status(201).json({
                success: true,
                userId: result.userId,
                message: 'User registered successfully'
            });
        } catch (userCreationError) {
            console.error('User creation error:', userCreationError);
            res.status(500).json({ 
                success: false,
                message: 'Server error during user creation',
                errorType: 'SERVER_ERROR'
            });
        }
    } catch (generalError) {
        console.error('Registration error:', generalError);
        res.status(500).json({ 
            success: false,
            message: 'Unexpected server error during registration',
            errorType: 'UNEXPECTED_ERROR'
        });
    }
}


export default { userLogin, createUser };
