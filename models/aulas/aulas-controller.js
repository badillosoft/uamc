class AulasController {
  constructor (db) {
    if (!db) {
      throw new Error('No hay conexión a la base de datos');
    }

    this.db = db;
    this.aulas = db.collection('aulas');

    this.transform = null;
  }

  find (query, projection, success, error) {
    var self = this;
    this.aulas.find(query, projection).toArray((err, aulas) => {
      if (err) {
        error(err);
        return;
      }

      aulas = aulas || [];

      if (self.transform) {
        aulas = self.map(aulas, self.transform);
      }

      if (self.render) {
        aulas = self.render(aulas);
      }

      success(aulas);
    });
  }

  map (data, fnMap) {
    var items = [];
    for (var aula of data) {
      items.push(fnMap(aula));
    }
    return items;
  }
}

module.exports = AulasController;
