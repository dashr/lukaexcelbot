'use strict';
var drive = require('./googledrive.js');
var drove = require('./googledrove.js');
var moment = require('moment');

var cerebro = module.exports = {};

cerebro.procesar_oracioncompra = function(oracion, spreadsheet, msg, bandera) {
  var datos = {};
  var resultados = oracion.match(/\d+/g).map(Number);
  datos.nombre =  msg.from.first_name + ((msg.from.last_name !== undefined) ? ' ' + msg.from.last_name : "");
  datos.telegram = "@" + msg.from.username;
  datos.precio = resultados[1];
  datos.volumen = resultados[0];
  datos.fecha = moment().format('DD-MM-YYYY, h:mm:ss');
  console.log(datos);
  if (bandera !== false) {
    drive.agregar(spreadsheet, datos);
  }
}

cerebro.procesar_oracionventa = function(oracion, spreadsheet, msg, bandera) {
  var datos = {};
  var resultados = oracion.match(/\d+/g).map(Number);
  datos.nombre =  msg.from.first_name + ((msg.from.last_name !== undefined) ? ' ' + msg.from.last_name : "");
  datos.telegram = "@" + msg.from.username;
  datos.precio = resultados[1];
  datos.volumen = resultados[0];
  datos.fecha = moment().format('DD-MM-YYYY, h:mm:ss');
  console.log(datos);
  if (bandera !== false) {
    drove.agregar(spreadsheet, datos);
  }
}


cerebro.actualiza_compra = function(oracion, msg) {
  drive.cargarSpreadsheet(function(spreadsheet) {
    cerebro.procesar_oracioncompra(oracion, spreadsheet, msg);
    drive.guardar(spreadsheet);
  })
}

cerebro.actualiza_venta = function(oracion, msg) {
  drove.cargarSpreadsheet(function(spreadsheet) {
    cerebro.procesar_oracionventa(oracion, spreadsheet, msg);
    drove.guardar(spreadsheet);
  })
}
