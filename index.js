mocha ramen_test.js

var express = require("express");
var app = express();
var port = Number(process.env.PORT || 8080);

app.get('/', function(req, res) { 
	res.sendfile('./web/ramen.html');
});

app.listen(port, function() {
	console.log("Listening on " + port);
});