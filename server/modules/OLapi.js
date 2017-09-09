const fetch = require( 'node-fetch');

exports.getBook = ( title) => {
  const q = `http://openlibrary.org/search.json?q=${encodeURIComponent( title)}`;
  return fetch( q)
  .then( (response) => {
    return response.json();
  })
  .catch( (err) => {
    console.error( "OL fetch failed:", err);
  });
};
exports.getCoverUrl = ( cover_id) => {
  return `http://covers.openlibrary.org/b/olid/${cover_id}`; // ?default=false`;
};
