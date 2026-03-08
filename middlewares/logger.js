const winston = require("winston");
const expressWinston = require("express-winston");

//Formato para que log sea JSON
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

//Logger para las solicitudes
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: messageFormat,
});

//Logger para errores
const errorLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: messageFormat,
});

module.exports = {
  requestLogger,
  errorLogger,
};
