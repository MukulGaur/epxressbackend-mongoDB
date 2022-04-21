import express from 'express';
const app = express();
import hbs from 'hbs';
const port = process.env.PORT || 8000;
import './db/conn.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import './db/conn.js';
import Register from './models/registers.js';
import {json} from 'express';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(staticPath));
app.set("view engine", 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/register', (req, res) => {
    res.render("register");
});

// create a new user
app.post('/register', async (req, res) => {
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password===cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                mobile: req.body.mobile,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword
            });

            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }

    }catch(error){
        res.send(400).send(error);
    }
});

// login check

app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("email or password doesn't match!");
        }

    }catch(error){
        res.status(400).send("Invalid email")
    }
});

app.listen(port, () => {
    console.log(`server is running at port: ${port}`);
});