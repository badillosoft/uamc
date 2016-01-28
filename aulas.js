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
  get_routes: {
    '/aulas': function (req, res) {
      var items = [];

      for (var piso = 4; piso <= 8; piso += 1) {
        for (var aula = 0; aula <= 20; aula += 1) {
          var description = [
            'Aula de clases',
            'Laboratorio de ciencias',
            'Laboratorio de cómputo'
          ][Math.floor(Math.random() * 3)];

          items.push({
            id: (100 * piso + aula),
            right: {
              class: 'text-center',
              content: '<strong>' + piso + '</strong>'
            },
            left: {
              content: '<em>' + (100 * piso + aula) + ' - ' + description + '</em>',
              notifications: Math.floor(Math.random() * 10)
            }
          });
        }
      }

      res.render('search', {
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
        items: items
      })
    }
  },
  post_routes: {
    '/aulas': function (req, res) {}
  }
};

module.exports = self;
