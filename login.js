var util = require('./util');

var self = {
	set: function (app, db) {
		self.app = app;
		self.db = db;

		for (var route in self.get_routes) {
			app.get(route, self.get_routes[route]);
		}

		for (var route in self.post_routes) {
			app.post(route, self.post_routes[route]);
		}
	},
	update: function (username, success, error) {
		var users = self.db.collection('users'),
			uquery = { token: util.getToken() };

		console.log('Actualizando el token del usuario: ' + username);

		users.update(
			{ username: username },
			{ '$set': uquery },
			function (err) {
				if (!!err) {
					console.log('! Error al ejecutar query');
					error('No se pudo crear la sesión');
					return;
				}
				console.log('> El usuario [' + username + '] ha sido actualizado');
				success(username, uquery.token);
			}
		);
	},
	login: function (username, password, success, error) {
		var users = self.db.collection('users');

			console.log('Ingresando al usuario: ' + username);

			var query = { username: username, password: password };

			users.findOne(query, function (err, user) {
				if (!!err || !user) {
					console.log('! El usuario [' + username + '] no pudo acceder');
					error('Los datos de acceso son incorrectos, intentelo nuevamente');
					return;
				}

				console.log('> El usuario [' + username + '] ha ingresado');
				self.update(username, success, error);
			});
	},
	validate: function (username, token, success, error) {
		var users = self.db.collection('users');

		console.log('Validando al usuario: ' + username);

		var dt = util.btoj(token);
		var dn = JSON.parse(JSON.stringify(new Date()));

		users.findOne(
			{ username: username, token: token },
			function (err, user) {
				if (!!err || !user || dt < dn) {
					console.log('! El usuario [' + username + '] no es válido');
					error();
					return;
				}

				console.log('> El usuario [' + username + '] es válido');
				self.update(username, success, error);
			}
		);
	},
	get_routes: {
		"/login": function (req, res) {
			res.render('login', {
				title: "Bienvenido al Asignador de UEAs",
				message: {
					type: "info",
					content: req.query.message ||
						"Por favor ingrese con su nombre de usuario y contraseña."
				}
			});
		},
		"/login/:username/:token": function (req, res) {
			self.validate(
				req.params.username, req.params.token,
				function (username, token) {
					res.redirect(req.query.url ||
						'/login?message=' + JSON.stringify({
							username: username,
							token: token
						}, null, '\t')
					);
				},
				function () {
					res.redirect('/login?message=La sesión ha expirado');
				}
			);
		}
	},
	post_routes: {
		'/login': function (req, res) {
			self.login(
				req.body.username, req.body.password,
				function (username, token) {
					res.send('Bienvenido: ' + username + ' ' + token);
				},
				function (message) {
					res.render('login', {
						title: "Bienvenido al Asignador de UEAs",
						message: {
							type: "danger",
							content: message
						},
						username: req.body.username,
						password: req.body.password
					});
				}
			);
		}
	}
};

module.exports = self;
