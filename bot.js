var TelegramBot = require('node-telegram-bot-api');
var brain = require('./brain');
var token =  process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';

var bot = new TelegramBot(token, { polling: true });

var procesar_compra = function(msg, match) {
  console.log('msg:', msg, 'match:', match)

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  brain.actualiza_compra(match[1], msg)
    // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Su orden de compra, " + resp + " ha sido agregada");
}

var procesar_venta = function(msg, match) {
  console.log('msg:', msg, 'match:', match)

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  brain.actualiza_venta(match[1], msg)
    // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Su orden de venta, " + resp + " ha sido agregada");
}



bot.onText(/\/compra (.+)/, procesar_compra);
bot.onText(/\/venta (.+)/, procesar_venta);


console.log('Bot listening..')
