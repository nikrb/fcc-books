const express = require('express');
const Book = require( 'mongoose').model( 'Book');
const Trade = require( 'mongoose').model( 'Trade');

const router = new express.Router();

// get all the books paged
router.post( '/books', (req, res) => {
  Book.getBooks( req.body, function( err, docs){
    if( err) console.error( "book get failed:", err);
    res.json( docs);
  });
});
// user adds a new book to their library
router.post( '/book', (req, res) => {
  Book.create( req.body, function( err, docs){
    if( err) console.error( "book create from json failed:", err);
    res.json( docs);
  });
});
// get all my books
router.post( '/mybooks', (req, res) => {
  Book.getMyBooks( req.body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "find my books failed:", err);
    }
    res.json( docs);
  });
});
// search open library for book
router.post('/search', (req, res) => {
  Book.search( req.body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "book search failed:", err);
    }
    res.json( docs);
  });
});
// get all my trade requests
router.post( '/request', (req, res) => {
  Trade.getUserRequests( req.body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "get user requests failed:", err);
    }
    res.json( docs);
  });
});
// save a trade
router.post( '/trade', (req, res) => {
  console.log( "post trade save:", req.body);
  Trade.saveTrade( req.body, function( result){
    res.json( result);
  });
});

module.exports = router;
