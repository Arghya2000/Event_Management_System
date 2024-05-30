
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const mysql = require("mysql")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { merge } = require("../routes/pages");

require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const port = process.env.PORT

const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

// app.use(express.json())

exports.register =async (req,res) =>{
    const name = req.body.name;
    const user = req.body.user;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM demotable WHERE user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        const sqlInsert = "INSERT INTO demotable VALUES (0,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[name, user, hashedPassword])
        
        await connection.query (search_query, async (err, result) => {
        if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
        if (result.length != 0) {
            connection.release()
            return res.render('register',{
                message: 'User already exists'
            })
        } 
        else {
            await connection.query (insert_query, (err, result)=> {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Created new User")
            console.log(result.insertId)
            // return res.render('register', {
            //     message: 'User registered'
            // })
            res.render('login');
            // res.sendStatus(201)
    })
  }
}) //end of connection.query()
}) //end of db.getConnection()
} //end of app.post()
    


exports.login= (req, res)=> {
    const user = req.body.userlogin;
    const password = req.body.passwordlogin;
    db.getConnection ( async (err, connection)=> {
     if (err) throw (err)
     const sqlSearch = "Select * from demotable where user = ?"
     const search_query = mysql.format(sqlSearch,[user])
     await connection.query (search_query, async (err, result) => {
      connection.release()
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       return res.render('login', {
        message: 'User does not exist'
       })
       // res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        // return res.render('login', {
        //     message: 'User Logged in'
        // })
        res.render('index');
        // res.send(`${username} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        return res.render('login', {
            message: 'Password incorrect'
        })
        // res.send("Password incorrect!")
        } 
      }
     }) 
    })
    }