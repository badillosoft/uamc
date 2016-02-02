use cua_uam_ueas

for (var piso = 4; piso <= 8; piso += 1) {
  for (var numero = 1; numero <= 20; numero += 1) {
    var descripcion = [
      'Aula de docencia',
      'Aula de usos multiples',
      'Laboratorio de ingeniería',
      'Laboratorio de computación',
      'Laboratorio de redes'
    ][Math.floor(Math.random() * 5)];

    var aula = {
      clave: '' + (piso * 100 + numero),
      piso: piso,
      numero: numero,
      cupo: Math.floor(Math.random() * 20 + 20),
      ueas: [],
      horario: [],
      descripcion: descripcion
    };

    db.aulas.insert(aula);
  }
}
