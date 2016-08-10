var express = require('express');
var posts = express.Router();
var request = require('request');
var rest = require('../lib/getJSON');

posts.get('/:id?/:slug?', function(req, res, next) {	
  var body = {
    titlePosts: 'posts',
    primaryMenuDefault: [{title: 'Home', url: '/', current: false},{title: 'Posts', url: '/posts/', current: true}],
  };
	rest.getJSONMap([
		{name: 'posts', url: 'http://playground.finaldream.de/wp-json/wp/v2/posts'},
		{name: 'currentPost', url: 'http://playground.finaldream.de/wp-json/wp/v2/posts/'+req.params.id},
		{name: 'pages', url: 'http://playground.finaldream.de/wp-json/wp/v2/pages'}
	], function (data) {
      body['data'] = data;
      res.render('posts', body);
  });	
});

module.exports = posts;

  