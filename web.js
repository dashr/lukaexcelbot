"use strict";
var express = require('express');
var helmet = require('helmet');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');

var app = express();
app.use(helmet());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

app.get('/heartbeat', function (req, res) {
  res.send("ok");
});

var server = app.listen(process.env.PORT, "0.0.0.0", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Servidor web inicio en http://%s:%s', host, port);
});

module.exports = function (bot) {
  app.post('/' + bot.token, function (req, res) {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
