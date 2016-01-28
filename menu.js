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
    '/': function (req, res) {
      res.render('menu', {
        title: 'Asignador de UEAs'
      });
    }
  },
  post_routes: {
    '/route': function (req, res) {}
  }
};

module.exports = self;
