const fetch = require( 'node-fetch');

exports.getBook = ( title, author) => {
  let q = "";
  if( title) q += `title=${encodeURIComponent( title)}`;
  if( author){
    if( q.length) q += "&";
    q += `author=${encodeURIComponent( author)}`;
  }
  const url = `http://openlibrary.org/search.json?${q}`;
  return fetch( url)
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
