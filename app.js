import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import pageRoutes from "./routes/page/routes.js"
import apiRoutes from "./routes/api/routes.js"

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));


app.use('/assets', express.static(join(__dirname, 'public/assets')));
app.use('/download', express.static(join(__dirname, 'public/download')));

app.use('/api', apiRoutes);
app.use('/', pageRoutes);




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