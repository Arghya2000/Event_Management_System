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


exports.create = (req,res) =>{
    const title = req.body.title;
    const datetime = req.body.date_time;
    const location = req.body.location;
    const ticketprice = req.body.ticket_price;
    const description = req.body.description;

    db.getConnection( (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM eventstable WHERE title = ?"
        const search_query = mysql.format(sqlSearch,[title])
        const sqlInsert = "INSERT INTO eventstable VALUES (0,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[title, datetime, location, ticketprice, description])
        
        connection.query (search_query, (err, result) => {
        if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
        if (result.length != 0) {
            connection.release()
            return res.render('creation',{
                message: 'title already exists'
            })
        } 
        else {
            connection.query (insert_query, (err, result)=> {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Created new event")
            console.log(result.insertId)
            return res.render('creation', {
                message: 'Event Created'
            })
            
    })
  }
}) 
}) 
} 
    

exports.book = (req,res) =>{
    const choose_title = req.body.choose_title;
    const event_location = req.body.event_location;
    const no_of_tickets = req.body.no_of_tickets;
    const phone_number = req.body.phone_number;
    const name = req.body.name;
    const booking_id = Math.floor(100000 + Math.random() * 900000).toString();

    db.getConnection( (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM ticketstable WHERE booking_id = ?"
        const search_query = mysql.format(sqlSearch,[booking_id])
        const sqlInsert = "INSERT INTO ticketstable VALUES (0,?,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[name, choose_title, event_location, no_of_tickets, phone_number, booking_id])
       
        connection.query (search_query, (err, result) => {
        if (err) throw (err)
          console.log("------> Search Results")
          console.log(result.length)
        if (result.length != 0) {
            connection.release()
            return res.render('ticketing',{
                message: 'Ticket already exists'
            })
        } 
        else {
            connection.query (insert_query, (err, result)=> {
            connection.release()
            if (err) throw (err)
            console.log ("--------> Booked new ticket")
            console.log(result.insertId)
            console.log(booking_id)
            return res.render('ticketing', {
                message: no_of_tickets+' Ticket booked with ID: '+booking_id
            })
    })
  }
})
})
}
    
