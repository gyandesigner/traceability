import jwt from 'jsonwebtoken';
import config from "../config/config.js";


const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt; 
    if (!token) {
        return res.redirect('/'); 
    }
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.clearCookie('jwt').redirect('/');
        }
        req.user = user;
        next();
    });
};
export default authenticateToken;