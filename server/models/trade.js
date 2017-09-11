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
    const {source_user, target_user, book, status} = req_body;
    if( trade) {
      trade.source_user = source_user;
      trade.target_user = target_user;
      trade.book = book;
      trade.status = status;
    } else {
      const Trade = mongoose.model( 'Trade');
      trade = new Trade( {source_user, target_user, book, status});
    }
    console.log( `save trade:`, trade);
    trade.save( function( err){
      if( err) console.error( "new trade save failed:", err);
      if( cb) cb( err, trade);
    });
  });
}

module.exports = mongoose.model('Trade', TradeSchema);
