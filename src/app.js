import express from 'express';
const app = express();
import hbs from 'hbs';
const port = process.env.PORT || 8000;
import './db/conn.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(staticPath));
app.set("view engine", 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});