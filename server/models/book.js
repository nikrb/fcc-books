const mongoose = require( 'mongoose');

const BookSchema = new mongoose.Schema({
  cover_id: {
    type: String,
    index: { unique: true}
  },
  owner: {
    email: { type: String},
    name: {type: String},
    full_name: {type: String}
  },
  title: String
});

module.exports = mongoose.model('Book', BookSchema);
