var express = require('express');

var app = express();


app.set('port', (process.env.PORT|| 6060));
app.use(express.static(__dirname + "/app")); //points to this directory 

var server = app.listen(app.get('port'));

