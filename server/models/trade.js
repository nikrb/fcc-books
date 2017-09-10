const mongoose = require( 'mongoose');
const STATUS = ['requested', 'cancelled', 'accepted', 'rejected'];

const TradeSchema = new mongoose.Schema({
  source_user: { email: String, name: String, full_name: String},
  target_user: { email: String, name: String, full_name: String},
  book: { cover_olid: String, title: String, cover_url_m: String},
  status: { type: String, enum: STATUS}
});

TradeSchema.statics.getUserRequests = function getUserRequests( req_body, cb){
  this.find( { $or : [
      { 'source_user.email': req_body.email},
      { 'target_user.email': req_body.email}
    ]},
    function(err,requests){
      if( err || requests.length === 0){
        console.error( "find user requests failed:", err);
      }
      if( cb) cb( err, requests);
    }
  );
}

TradeSchema.statics.saveTrade = function saveTrade( req_body, cb){
  this.findOne( {_id: req_body._id}, function( err, trade){
    if( trade) {
      const {source_user, target_user, book, status} = req_body;
      if( source_user && source_user.email !== trade.source_user.email)
        trade.source_user = source_user;
      if( target_user && target_user.email !== trade.target_user.email)
        trade.target_user = target_user;
      if( book && book.cover_olid !== trade.book.cover_olid) trade.book = book;
      if( status && status !== trade.status) trade.status = status;
    } else {
      const {source_user, target_user, book, status} = trade;
      trade = new this( {source_user, target_user, book, status});
    }
    console.log( `save trade:`, new_trade);
    new_trade.save( function( err){
      if( err) console.error( "new trade save failed:", err);
      if( cb) cb( err, new_trade);
    });
  });
}

module.exports = mongoose.model('Trade', TradeSchema);
