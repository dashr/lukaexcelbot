"use strict";
//drove actualiza venta
var Spreadsheet = require('edit-google-spreadsheet');
var drove = module.exports = {}

var drivelizar = function(valor) {
  return String(valor).replace('.', ',')
}

drove.agregar = function(spreadsheet, info) {

  var info_a_agregar = [info.nombre, info.telegram, drivelizar(info.precio), drivelizar(info.volumen), " ", " ", info.fecha]

  console.log('info_a_agregar', JSON.stringify(info_a_agregar))
  var info_enviada = {}
  info_enviada[drove.nueva_fila] = {
    1: [
      info_a_agregar
    ]
  }

  console.log('info_enviada', JSON.stringify(info_enviada))

  spreadsheet.add(info_enviada);
  drove.nueva_fila = drove.nueva_fila + 1
}

drove.guardar = function(spreadsheet) {
  spreadsheet.send(function(err) {
    if (err) throw err;
    console.log("Updated Cells");
  });
}

drove.cargarSpreadsheet = function(callback) {
  Spreadsheet.load({
    debug: true,
    //spreadsheetName: 'Luka Trading',
    spreadsheetId: '1yyNkWD0dWKT3j_hc_9xFHcyeKW6J3_WCFXmBE-jIEOw',
    //worksheetName: 'ACTUALIZACION_venta',
    worksheetId: "oqf24bv",
    "oauth2": {
      "client_id": process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
      "client_secret": process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
      "refresh_token": process.env.GOOGLE_REFRESH_TOKEN || 'GOOGLE_REFRESH_TOKEN'
    }

  }, function sheetReady(err, spreadsheet) {
    spreadsheet.receive(function(err, rows, info) {
      if (err) throw err;
      // console.log("Found rows:", rows);
      var filas_ocupadas = Object.keys(rows)
      console.log('filas_ocupadas', filas_ocupadas)
      var ultima_fila_ocupada = filas_ocupadas[filas_ocupadas.length - 1]
      console.log('ultima_fila_ocupada', parseInt(ultima_fila_ocupada) + 1)
      drove.nueva_fila = parseInt(ultima_fila_ocupada) + 1
      callback(spreadsheet)
    })
  })
}
