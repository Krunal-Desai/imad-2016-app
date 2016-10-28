//Requires to create NodeJs App
var express = require('express');

//Morgan Logger added
var morgan = require('morgan');

//countains the require path related modules
var path = require('path');

//Creates an Express application.
var app = express();

//This tells express to log via morgan
//and morgan to log in the "combined" pre-defined format
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

//Serves the main http://krunal-desai.imad.hasura-app.io/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//Serves styles.css file
app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

//serves require images
/*
app.get('/img/search.gif', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','img', 'search.gif'));
});
*/

var pool = new Pool(config);

app.get('ui/img/:imgname', function (req, res) {
   
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
                        
                        res.sendFile(path.join(__dirname,'ui','img',imgNameData));
                    }
      }
   });
});



// Use 8080 for local development because you might already have apache running on 80
var port = 8080; 
app.listen(8080, function () 
{
  console.log(`IMAD course app listening on port ${port}!`);
});
