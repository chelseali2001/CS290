/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Chelsea Li
 * Email: lichel@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

var postData = require('./postData.json');
var postVals = {'posts': postData};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('postPage', postVals);
});

app.get('/post/:n', function(req, res, next) {
  var nVal = parseInt(req.params.n);
  
  if (postVals.posts[nVal] && (nVal >= 0 && nVal < postVals.posts.length)) {
    res.status(200).render('partials/post', postVals.posts[nVal]);
  } else {
    next();
  }
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
