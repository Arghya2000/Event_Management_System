const express = require("express")
const app = express()

const path = require("path")

const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();


require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const port = process.env.PORT

// app.use("/assets",express.static("assets"));
const publicDirectory =path.join(__dirname, './public' );
app.use(express.static(publicDirectory));

//parse url encoded bodies (sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse json bodies (sent by api clients)
app.use(express.json());

app.set('view engine', 'hbs');

const mysql = require("mysql")

const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

db.getConnection( (err, connection)=> {
   if (err) throw (err)
   console.log ("DB connected successful: " + connection.threadId)
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/event', require('./routes/event'));


app.listen(port, 
    ()=> console.log(`Server Started on port ${port}...`))