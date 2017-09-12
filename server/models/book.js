const mongoose = require( 'mongoose');
const ol = require( '../modules/OLapi');

const BookSchema = new mongoose.Schema({
  cover_olid: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: String,
  cover_url_m: String
});

BookSchema.statics.create  = function create( req_body, cb){
  console.log( "add book:", req_body);
  const {owner, title, cover_olid, cover_url_m} = req_body;
  const Book = mongoose.model( 'Book');
  const book = new Book( {owner, title, cover_olid, cover_url_m});
  book.save( (err) => {
    let message = "book added",
        success = true;
    if( err){
      console.error( "book save failed:", err);
      success = false;
      message = "book not saved";
    }
    book.populate( 'owner', function( err, book) {
      if( err) console.error( "book owner population failed:", err);
      if( cb) cb( err, {success, message, book});
    });
  });
}
BookSchema.statics.getBooks = function getBooks( req_body, cb){
  const that = this;
  const {limit, offset,owner} = req_body;
  console.log( "get all books missing owner:", owner);
  this.count({ owner: {$ne : owner}}, function( err, total_rows){
    if( err) console.log( "book schema count failed:", err);
    that.find( {owner: { '$ne': owner}})
    .populate( 'owner')
    .skip( offset)
    .limit( limit)
    .exec( function( err, books){
      if( err || !books || books.length === 0){
        console.error( "book get failed:", err);
        if( cb) cb( err, {success:false, message: "books not found"});
      } else {
        if( cb) cb( null, { success: true, books, total_rows});
      }
    });
  });
}

BookSchema.statics.getMyBooks = function getMyBooks( req_body, cb){
  console.log( "get my books:", req_body);
  const {owner} = req_body;
  // FIXME: is this correct?
  this.find( {owner}).populate( 'owner').exec( function( err, books){
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
