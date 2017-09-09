const express = require('express');
const ol = require( '../modules/OLapi');

const router = new express.Router();

router.post('/search', (req, res) => {
  const {title} = req.body;
  ol.getBook( title)
  .then( (response) => {
    const data = response.docs.map( (d) => {
      return { cover_url: ol.getCoverUrl( d.cover_edition_key), title:d.title_suggest};
    });
    res.json( data);
  })
  .catch( (err) => {
    console.error( "ol book search failed:", err);
  });
});

module.exports = router;
