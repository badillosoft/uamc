var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mustacheExpress = require('mustache-express');
var login = require('./login');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(bodyParser());
app.use(express.static('public'));

MongoClient.connect('mongodb://localhost/cua_uam_ueas', function (err, db) {
	if (!!err) {
		console.log('No se puede conectar a la base de datos');
		app.get("/", function (req, res, next) {
			res.render('error', {
				title: "Error de conexión a la base de datos",
				message: "Ocurrió un error en el servidor al conectarse " +
					"a la base de datos"
			});
		});
		return;
	}

	login.set(app, db);
});

http.createServer(app).listen(8080, function () {
	console.log('El servidor se ha iniciado en http://localhost:8080/');
});