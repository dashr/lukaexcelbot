if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

var bot = require('./bot');
require('./web')(bot);
