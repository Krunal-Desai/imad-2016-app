var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

//Index servent
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//Image Servent
app.get('/assets/img/:image', function (req, res) {

  var data = req.params.image;

  res.sendFile(path.join(__dirname,'ui','assets','img',data));
});

//Style Servent
app.get('/assets/css/:css', function (req, res) {

  var cssdata = req.params.css;

  res.sendFile(path.join(__dirname,'ui','assets','css',cssdata));
});

//Script Servent
app.get('/assets/js/:js', function (req, res) {

  var jsdata = req.params.js;

  res.sendFile(path.join(__dirname,'ui','assets','js',jsdata));
});

//Font Servent
app.get('/assets/font/:font', function (req, res) {

  var fontdata = req.params.font;

  res.sendFile(path.join(__dirname,'ui','assets','font',fontdata));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

