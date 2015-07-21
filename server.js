var express = require('express');

var app = express();

var path = require('path');



app.set('port', (process.env.PORT|| 6060));
app.use(express.static(__dirname));

var server = app.listen(app.get('port'));

//var port = process.env.PORT || 6060;

/*
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname +'/index.html'));
});

app.listen(6060, function(){
  console.log("listening on port 6060");
});

*/