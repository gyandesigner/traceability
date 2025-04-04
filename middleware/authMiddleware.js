exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;    
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      res.redirect('/login');
    }
  };
  
exports.errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).render('error', { message: err.message });
};