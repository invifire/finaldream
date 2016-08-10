var express = require('express');
var page = express.Router();
var request = require('request');

page.get('/:id/:slug?', function(req, res) {
  console.log(req.params.id);
  var data = {
    titlePost: 'page',
    primaryMenuDefault: [{title: 'Home', url: '/', current: false},{title: 'posts', url: '/post/', current: false}],
  };
  if (!req.params.id){
      res.redirect(301, '/page/14');
  } else {
    request.get('http://playground.finaldream.de/wp-json/wp/v2/pages', function(err, response, body) {
      if (!err && response.statusCode == 200) {
          data['primaryMenuPages'] = JSON.parse(body);
          request.get('http://playground.finaldream.de/wp-json/wp/v2/pages/'+req.params.id, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              data['currentPage'] = JSON.parse(body);
              res.render('page', data);
            }
          })
      }
    })
  }
});

module.exports = page;

  