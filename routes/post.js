var express = require('express');
var post = express.Router();
var request = require('request');

post.get('/:id/:slug?', function(req, res) {
  console.log(req.params.id);
  var data = {
    titlePost: 'post',
    postId: '1',
    postUrl: 'title-of-current-post',
    nextPostTitle: 'ABC',
    primaryMenuDefault: [{title: 'Home', url: '/', current: false},{title: 'Posts', url: '/post/', current: true}],
  };
  var apiurl = 'http://playground.finaldream.de/wp-json/wp/v2/posts';
  if (!req.params.id){
      res.redirect(301, '/post/1');
  } else {
    request.get('http://playground.finaldream.de/wp-json/wp/v2/pages', function(err, response, body) {
      if (!err && response.statusCode == 200) {
          data['primaryMenuPages'] = JSON.parse(body);
          request.get(apiurl, function(err, response, body) {
            if (!err && response.statusCode == 200) {
              data['allPost'] = JSON.parse(body);
              request.get(apiurl+'/'+req.params.id, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                  data['currentPost'] = JSON.parse(body);
                  res.render('post', data);
                }
              })
            }
          })
      }
    })
  }
});

module.exports = post;

  