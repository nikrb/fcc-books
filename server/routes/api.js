const express = require('express');
const ol = require( '../modules/OLapi');

const router = new express.Router();

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
        cover_url_s: base_url+"-S.jpg",
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
