const express=require('express');
const router =express.Router();

router.get('/', (req,res) => {
    res.render('index');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/creation', (req,res) => {
    res.render('creation');
});

router.get('/dashboard', (req,res) => {
    res.render('dashboard');
});

router.get('/discovery', (req,res) => {
    res.render('discovery');
});

router.get('/ticketing', (req,res) => {
    res.render('ticketing');
});

module.exports =router;