import express from 'express';
const app = express();
const port = process.env.PORT || 8000;
import './db/conn.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticPath = path.join(__dirname, '../public');

app.use(express.static(staticPath));
app.set("view engine", 'hbs');

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});