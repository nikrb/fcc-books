const express = require('express');
const Book = require( 'mongoose').model( 'Book');

const router = new express.Router();

router.post( '/book', (req, res) => {
  Book.createFromJSON( req.body, function( err, docs){
    if( err) console.error( "book create from json failed:", err);
    res.json( docs);
  });
});

router.post( '/mybooks', (req, res) => {
  Book.getMyBooks( req.body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "find my books failed:", err);
    }
    res.json( docs);
  });
});

router.post('/search', (req, res) => {
  Book.search( req.body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "book search failed:", err);
    }
    res.json( docs);
  });
});

router.post( '/request', (req, res) => {
  Trade.getUserRequests( req_body, function( err, docs){
    if( err || docs.length === 0){
      console.error( "get user requests failed:", err);
    }
    res.json( docs);
  })
});

module.exports = router;
