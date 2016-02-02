var AulasController = require('./aulas-controller');

var self = {
  set: (app, db) => {
    self.app = app;
    self.db = db;

    for (var route in self.get_routes) {
      app.get(route, self.get_routes[route]);
    }

    for (var route in self.post_routes) {
      app.post(route, self.post_routes[route]);
    }

    self.controller = new AulasController(db);

    self.controller.transform = (aula) => {
      return {
        id: aula.clave,
        right: {
          class: 'text-center',
          content: '<strong>' + aula.piso + '</strong>'
        },
        left: {
          content: '<em>' + (aula.numero || '#') + ' - ' +
            (aula.descripcion || 'Sin descripción') + '</em>',
          notifications: 0
        }
      };
    };

    self.controller.render = (aulas) => {
      return {
        title: 'Aulas',
        right: {
          class: 'text-center',
          title: '<h3>Piso</h3>',
          size: 3
        },
        left: {
          class: 'text-left',
          title: '<h3>Aula</h3>',
          size: 9
        },
        search_title: 'Escribe el nombre del piso o aula',
        items: aulas
      };
    };
  },
  get_routes: {
    '/aulas': (req, res) => {
      self.controller.find({}, {}, (aulas) => {
        res.render('search', aulas);
      }, (err) => {
        res.send(err);
      });
    }
  },
  post_routes: {
    '/aulas': (req, res) => {}
  }
};

module.exports = self;
