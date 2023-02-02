'use strict';

require('dotenv').config();
const config = require('./config');
import httpContext from 'express-http-context';
import winston from 'winston';
import 'winston-daily-rotate-file';

const { createLogger, format, transports } = winston;
const { combine, timestamp, simple, colorize, printf } = format;
const path = require('path');

const logTransports = [
  new transports.Console({
    level: config.logs.level,
    handleExceptions: true,
    format: config.logs.graylogEnabled ?
      format.json() :
      format.combine(
        colorize(),
        simple(),
      )
  }),
  new transports.DailyRotateFile({
    level: 'info',
    filename: path.join(config.logs.logPath, 'server.%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '10d',
    format: format.combine(
      format.json(),
    ),
  }),
  new transports.DailyRotateFile({
    level: 'error',
    filename: path.join(config.logs.logPath, 'server.error.%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: '10d',
    format: format.combine(
      format.json(),
    ),
  }),
];

export default new createLogger({
  transports: logTransports,
  format: combine(
    timestamp(),
    printf((info) => {
      info.method = httpContext.get('method');
      info.url = httpContext.get('url');
      info.user = httpContext.get('user')?.email;
      info.traceId = httpContext.get('traceId');
      return info;
    })
  ),
  handleExceptions: true,
  handleRejections: true,
  exitOnError: false
}).child({ env: config.env });