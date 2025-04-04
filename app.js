const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/assets', express.static(`${__dirname}/public/assets`));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});