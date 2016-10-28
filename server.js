var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

//Database set up
var Pool = require('pg').Pool;

var config = {
  
  user: 'krunal-desai',
  database: 'krunal-desai',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/img/:articleName', function (req, res) {

    var data = req.params.articleName;
    
    res.sendFile(path.join(__dirname, 'ui','img',data));
});

var pool = new Pool(config);
/*
app.get('/ui/img/:imgname', function (req, res) {
   
   pool.query("SELECT * FROM imagedata WHERE imagename = '$1'",[req.params.imgname],function(err,result){
       
        if(err)
      {
                res.status(500).send(err.toString());
      }
      
      else
      {
                if(result.rows.length === 0)
                    res.status(404).send('imgNotFound');
                    
                else
                    {
                        var imgNameData = result.rows[0];
                        
                        res.sendFile(path.join(__dirname,'ui','img', imgNameData));
                    }
      }
   });
});
*/

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});