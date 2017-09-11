const mongoose = require( 'mongoose');
const STATUS = ['requested', 'cancelled', 'accepted', 'rejected', 'deleteme'];

const TradeSchema = new mongoose.Schema({
  source_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // { email: String, name: String, full_name: String},
  target_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // { email: String, name: String, full_name: String},
  book: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
  // book: { _id: String, owner: cover_olid: String, title: String, cover_url_m: String},
  status: { type: String, enum: STATUS}
});

TradeSchema.statics.getUserRequests = function getUserRequests( req_body, cb){
  this.find( { status: {$in: ['requested','accepted']}, $or : [
      { 'source_user._id': req_body.source_user},
      { 'target_user._id': req_body.target_user}
    ]})
    .populate( { path: 'source_user', select: '_id, name, full_name'})
    .populate( { path: 'target_user', select: '_id, name, full_name'})
    .populate( 'book')
    .exec(
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
    if( err) console.log( "save trade find failed:", err);
    const {source_user, target_user, book, status} = req_body;
    if( trade) {
      // FIXME: just the status should change?
      // trade.source_user = source_user;
      // trade.target_user = target_user;
      // trade.book = book;
      trade.status = status;
    } else {
      const Trade = mongoose.model( 'Trade');
      trade = new Trade( {source_user, target_user, book, status});
    }
    trade.save( function( err){
      if( err) console.error( "new trade save failed:", err);
      // FIXME: can we use trade.populate(callback) instead to pop all?
      const promise = trade
      .populate( { path:'source_user', select: '_id, name, full_name'})
      .populate( { path:'target_user', select: '_id, name, full_name'})
      .populate( 'book')
      .execPopulate()
      .then( function( pop_trade){
        if( cb) cb( pop_trade);
      });
    });
  });
}

module.exports = mongoose.model('Trade', TradeSchema);
