// import jwt from 'jsonwebtoken';
// import config from "../config/config.js";


// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.jwt; 
//     console.log("Token === > ", token);
    
//     if (!token) {
//         return res.redirect('/'); 
//     }
//     jwt.verify(token, config.jwtSecret, (err, user) => {
//         if (err) {
//             return res.clearCookie('jwt').redirect('/');
//         }
//         req.user = user;
//         next();
//     });
// };
// export default authenticateToken;


import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("Token === > ", token);
   
    const isApiRequest = req.originalUrl.startsWith('/api/') ||  req.xhr ||  req.headers.accept?.includes('application/json');
    
    if (!token) {
        if (isApiRequest) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }
        return res.redirect('/');
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            if (isApiRequest) {
                return res.status(401).json({ error: 'Unauthorized - Invalid token' });
            }
            return res.clearCookie('jwt').redirect('/');
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;