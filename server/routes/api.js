const express = require('express');
const Book = require( 'mongoose').model( 'Book');

const router = new express.Router();

router.post( '/book', (req, res) => {
  console.log( "add book:", req.body);
  const {owner, title, cover_olid, cover_url_m} = req.body;
  const book = new Book( {owner, title, cover_olid, cover_url_m});
  book.save( (err) => {
    if( err){
      console.error( "book save failed:", err);
      res.json( {success: false, message: "book not saved"});
    } else {
      res.json( {success: true, message: "book added to your list"});
    }
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

module.exports = router;
