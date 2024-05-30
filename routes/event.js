const express=require('express');
const router =express.Router(),{create,fetch,book}=require('../controllers/event');

router.post('/create',  create)
// router.post('/fetch', fetch)
router.post('/book',  book)

module.exports =router;
