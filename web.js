"use strict";
var express = require('express');
var helmet = require('helmet');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');
var _ = require('lodash/core');
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

var app = express();
app.use(helmet());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

app.get('/heartbeat', function (req, res) {
  res.send("ok");
});

app.get('/libro_ventas', function (req, res) {
  redis.zrevrange('ventas', 0, -1).then(function (result) {
    var pipeline = redis.pipeline();
    result.forEach(function(key) {
      pipeline.hgetall(key);
    });
    pipeline.exec(function (err, results) {
    var filtered = _.map(results, _.last);
      res.json({
        status: 'ok',
        data: filtered
      });
    });
  });
});

app.get('/libro_compras', function (req, res) {
  redis.zrange('compras', 0, -1).then(function (result) {
    var pipeline = redis.pipeline();
    result.forEach(function(key) {
      pipeline.hgetall(key);
    });
    pipeline.exec(function (err, results) {
    var filtered = _.map(results, _.last);
      res.json({
        status: 'ok',
        data: filtered
      });
    });
  });
});

var server = app.listen(65483, "0.0.0.0", function () {
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
