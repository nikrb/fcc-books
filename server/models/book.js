const mongoose = require( 'mongoose');
const ol = require( '../modules/OLapi');

const BookSchema = new mongoose.Schema({
  cover_olid: String,
  owner: {
    email: { type: String},
    name: {type: String},
    full_name: {type: String}
  },
  title: String,
  cover_url_m: String
});

BookSchema.statics.getMyBooks = function getMyBooks( req_body, cb){
  console.log( "get my books:", req_body);
  const {email} = req_body;
  console.log( "get books for owner:", email);
  this.find( {'owner.email':email}, function( err, books){
    if( err || !books || books.length === 0){
      if( cb) cb( err, {success:false, message: "books not found"});
    } else {
      if( cb) cb( null, { success:true, books});
    }
  });
}
BookSchema.statics.search = function search( req_body, cb){
  const {title} = req_body;
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
    if( cb) cb( null, data);
  })
  .catch( (err) => {
    console.error( "ol book search failed:", err);
    if( cb) cb( err, {success: false, message: "books not found"});
  });
}

module.exports = mongoose.model('Book', BookSchema);
