//Error logger
const winston = require('winston');


//Error Log Configuration
var logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/errorLog.log'})
    ],
    exitOnError: false
  });
  
module.exports = logger;