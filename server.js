var express = require('express');

var app = express();

var path = require('path');


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname +'/index.html'));
});

app.listen(6060, function(){
  console.log("listening on port 6060");
});