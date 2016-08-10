var express = require('express');
var pages = express.Router();
var request = require('request');
var rest = require('../lib/getJSON');

pages.get('/:id?/:slug?', function(req, res, next) {	
  var body = {
    titlePosts: 'Pages',
    primaryMenuDefault: [{title: 'Home', url: '/', current: false},{title: 'Posts', url: '/posts/', current: false}],
  };
	rest.getJSONMap([
		{name: 'currentPage', url: 'http://playground.finaldream.de/wp-json/wp/v2/pages/'+req.params.id},
		{name: 'pages', url: 'http://playground.finaldream.de/wp-json/wp/v2/pages'}
	], function (data) {
      body['data'] = data;
      console.log(body);
      res.render('pages', body);
  });	
});


module.exports = pages;

  