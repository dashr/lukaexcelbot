# Excel Exchange Bot

[![GitHub Issues](https://img.shields.io/github/issues/dashr/lukaexcelbot.svg?style=flat-square)](https://github.com/dashr/lukaexcelbot/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square)
![Release](https://img.shields.io/github/release/dashr/lukaexcelbot.svg?style=flat-square)

<img src="https://i.imgur.com/xHFaGub.png">

Bot de telegram basado en un trading informal, para automatizar las ordenes de compra y venta.


## Uso

No hay version en produccion. Se quedo parado en puro Test.


## Desarollo para Contribuciones

* [NodeJS 8+](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)
* [NVM](https://github.com/creationix/nvm)
* [Bot en Telegram](https://core.telegram.org/bots)
* Google Sheet (requiré oAuth2)

En github, empiezan con un Fork para tener su propia copia. Y haz clone local.

```bash
$ git clone git@github.com:[TU USUARIO]/lukaexcelbot.git
$ cd lukaexcelbot
$ nvm install v8.9
$ nvm use v8.9
$ yarn                    # [similar a: npm install]
$ cp .env_example .env
$ npm start
```

Se requiere configurar estos variables ambientales en ```.env```

```bash
TELEGRAM_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
```

En desarrollo local, funciona con Polling, but en produccion es necessario correr con un [WebHook](https://core.telegram.org/bots/api#setwebhook). Este repo funciona en Heroku, pero se podria montar en cualquir servidor que puede servir NodeJS como [Now](https://zeit.co/now), OpenShift, [Dokku](http://dokku.viewdocs.io/dokku/), o cualquir VPS como [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-debian-8) o [Vultr](https://www.vultr.com/features/). Mas ejemplos en [varias plataformas](https://github.com/yagop/node-telegram-bot-api/tree/master/examples/webhook).

##### Favor de contribuir vía un Pull Request aquí en GitHub.

## ❤️ Creditos

Autores

* [Patricio Mallea Gonzáles](https://github.com/patriciomalleag)
* [dashr](https://github.com/dashr)

Gracias a las herramientas de

* [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)
* [Edit Google Spreadsheet](https://github.com/jpillora/node-edit-google-spreadsheet)

Inspirado por

* [GastosBot](https://github.com/guerrerocarlos/TheGastosBot-Telegram)


Recursos

* [Pagina Oficial de LUKA](https://www.cryptoluka.cl/)
* [Equipo Luka](https://github.com/cryptoluka/cryptoluka)


## License
