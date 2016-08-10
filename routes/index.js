var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
  titlePost: 'home',
  nav: [
    {title: 'Home', url: '/', current: true},
    {title: 'Posts', url: '/post/', current: false}
  ]
  };
  request.get('http://playground.finaldream.de/wp-json/wp/v2/pages', function(err, response, body) {
    if (!err && response.statusCode == 200) {
        data['primaryMenuPages'] = JSON.parse(body);
        res.render('index', data);
    }
  })
});

module.exports = router;

  