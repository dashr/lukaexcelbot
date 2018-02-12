"use strict";
var TelegramBot = require('node-telegram-bot-api');
var brain = require('./brain');
var token =  process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
var url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';

if(process.env.NODE_ENV === 'production') {
  var bot = new TelegramBot(token);
  bot.setWebHook( url + bot.token);
}
else {
  var bot = new TelegramBot(token, { polling: true });
}

console.log('Bot server started in ' + process.env.NODE_ENV + ' mode');

var procesar_compra = function(msg, match) {
  console.log('msg:', msg, 'match:', match);

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  brain.actualiza_compra(match[1], msg);
    // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Su orden de compra, " + resp + " ha sido agregada");
}

var procesar_venta = function(msg, match) {
  console.log('msg:', msg, 'match:', match);

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  brain.actualiza_venta(match[1], msg);
    // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Su orden de venta, " + resp + " ha sido agregada");
}

var procesar_echo = function(msg) {
  console.log('msg:', msg);

  var name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 'Hola, ' + name + '!').then(function () {
    // reply sent!
  });
}

bot.onText(/\/compra (.+)/, procesar_compra);
bot.onText(/\/venta (.+)/, procesar_venta);
bot.onText(/\/echo (.+)/, procesar_echo);


module.exports = bot;