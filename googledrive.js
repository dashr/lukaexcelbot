//drive actualiza la compra

var Spreadsheet = require('edit-google-spreadsheet');
var drive = module.exports = {}

var drivelizar = function(valor) {
  return String(valor).replace('.', ',')
}

drive.agregar = function(spreadsheet, info) {

  var info_a_agregar = [info.nombre, info.telegram, drivelizar(info.precio), drivelizar(info.volumen), " ", " ", info.fecha]

  console.log('info_a_agregar', JSON.stringify(info_a_agregar))
  var info_enviada = {}
  info_enviada[drive.nueva_fila] = {
    1: [
      info_a_agregar
    ]
  }

  console.log('info_enviada', JSON.stringify(info_enviada))

  spreadsheet.add(info_enviada);
  drive.nueva_fila = drive.nueva_fila + 1
}

drive.guardar = function(spreadsheet) {
  spreadsheet.send(function(err) {
    if (err) throw err;
    console.log("Updated Cells");
  });
}

drive.cargarSpreadsheet = function(callback) {
  Spreadsheet.load({
    debug: true,
    spreadsheetName: 'Luka Trading',
    worksheetName: 'ACTUALIZACION_compra',
    "oauth2": {
      "client_id": "YOUR CLIENT ID",
      "client_secret": "YOUR CLIENT SECRET",
      "refresh_token": "YOUR REFRESH TOKEN"
    }

  }, function sheetReady(err, spreadsheet) {
    spreadsheet.receive(function(err, rows, info) {
      if (err) throw err;
      // console.log("Found rows:", rows);
      var filas_ocupadas = Object.keys(rows)
      console.log('filas_ocupadas', filas_ocupadas)
      var ultima_fila_ocupada = filas_ocupadas[filas_ocupadas.length - 1]
      console.log('ultima_fila_ocupada', parseInt(ultima_fila_ocupada) + 1)
      drive.nueva_fila = parseInt(ultima_fila_ocupada) + 1
      callback(spreadsheet)
    })
  })
}
