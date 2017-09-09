const mongoose = require( 'mongoose');

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

module.exports = mongoose.model('Book', BookSchema);
