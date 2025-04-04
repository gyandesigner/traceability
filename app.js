import express from 'express';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));


app.use('/assets', express.static(join(__dirname, 'public/assets')));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', userRoutes);
app.use('/', dashboardRoutes);




app.use((req, res, next) => {
  const model = {
    title: '',
    layout: 'layouts/layout'
  }
  model.title = '404 Page Not Found | Tracibility';
  model.layout = 'layouts/error-layout';
  
  res.status(404).render('not-found-page', model);

 
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});