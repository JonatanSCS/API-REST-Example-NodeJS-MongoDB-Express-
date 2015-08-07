// Incluímos las dependencias
var express = require("express"),
    app     = express(),
    http    = require("http"),
    server  = http.createServer(app),
    path    = require('path'),
    log     = require('./libs/log')(module),
    config  = require('./libs/config');
    mongoose = require("mongoose");

// Configuramos para realizar métodos REST
// bodyParser() parsea JSON
// methodOverride() permite implementar métodos HTTP
// app.router crea rutas
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.use(function (req, res, next){
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function (err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

routes = require('./routes/books')(app);

// Conexión con mongodb
mongoose.connect('mongodb://localhost/books', function (err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

app.get('/', function(req, res) {
  res.send("Welcome to the books data base!");
});

server.listen(3000, function() {
  console.log("Server running on http://localhost:3000 :D");
});