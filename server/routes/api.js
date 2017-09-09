const express = require('express');
const ol = require( '../modules/OLapi');
const Book = require( 'mongoose').model( 'Book');

const router = new express.Router();

router.post( '/mybooks', (req, res) => {
  console.log( "get my books:", req.body);
  const {email} = req.body;
  console.log( "get books for owner:", email);
  Book.find( {'owner.email':email}, function( err, books){
    if( err || !books || books.length === 0){
      res.json( {success:false, message: "books not found"});
    } else {
      res.json( {success:true, books});
    }
  });
});

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
router.post('/search', (req, res) => {
  const {title} = req.body;
  ol.getBook( title)
  .then( (response) => {
    const data = response.docs.map( (d) => {
      let cover_olid = "noimage";
      let base_url = ol.getCoverUrl( d.cover_edition_key);
      if( base_url) cover_olid = d.cover_edition_key;
      if( typeof base_url === 'undefined'){
        base_url = ol.getCoverUrl( d.edition_key);
        if( base_url) cover_olid = d.edition_key;
      }
      return ({
        title:d.title_suggest,
        cover_olid: cover_olid,
        // cover_url_s: base_url+"-S.jpg",
        cover_url_m: base_url+"-M.jpg"
      });
    });
    res.json( data);
  })
  .catch( (err) => {
    console.error( "ol book search failed:", err);
  });
});

module.exports = router;
