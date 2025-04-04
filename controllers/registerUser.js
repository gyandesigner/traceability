import * as userModel from '../models/user.model.js';

const registerPage = async (req,res) => {

    const model = {
        title: '',
        layout: 'layouts/layout'
    }
    
    model.title = 'Login | Tracibility';
    model.layout = 'layouts/login-layout';

    res.render('register', model);
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

export { registerPage, createUser };