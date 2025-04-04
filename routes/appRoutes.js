const express = require('express');
const router = express.Router();


app.use('/', userRoutes);
app.use('/', dashboardRoutes);

module.exports = router;
