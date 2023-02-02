'use strict';

require('dotenv').config();
const config = require('./config');
import container from './boot.js';

import { isAuthenticated, isGranted } from './middlewares/auth.js';
import loggerMiddleware from './middlewares/logger.js';
// import tracking from './middlewares/tracking.js';
import systemInfo from './utils/sysinfo.js';
import logger from './logger.js';

import { loadControllers, scopePerRequest } from 'awilix-express';
import helmetCrossDomain from 'helmet-crossdomain';
import httpContext from 'express-http-context';
import fileUpload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import userAgent from 'express-useragent';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import winston from 'winston';
import helmet from 'helmet';
import cors from 'cors';

let app;

function initHelmetHeaders (app) {
  try {
    app.use(helmet());
    app.use(helmetCrossDomain());
  } catch (err) {
    logger.error(`HELMETS LOAD ERROR: ${err}`);
  }
}

function loadAPI (app) {
  try {
    app.use(scopePerRequest(container));
    app.use(loggerMiddleware.init);
    app.use(isAuthenticated);
    app.use(isGranted);
    const controllers = loadControllers('./../api/controllers/**/*.js', { cwd: __dirname });
    app.use(config.api.prefix, controllers);
    app.use(loggerMiddleware.end);
  } catch (err) {
    logger.error(`API LOAD ERROR: ${err}`);
  }
}

function initMiddleware (app) {
  try {
    app.use(cors(config.cors));
    app.set('trust proxy', config.env === 'local' ? false : 1);
    app.use(rateLimit({
      windowMs: config.security.minutesUntilMaxRequestsAreRefreshed * 60 * 1000,
      max: config.security.maxRequestsAllowed
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1000kb' }));
    app.set('json replacer', (k, v) => (v === null ? undefined : v));
    app.use(fileUpload({ limits: { fileSize: 5e6 } }));
    app.use(cookieParser());
    app.use(userAgent.express());
    app.use(httpContext.middleware);
    loadAPI(app);
    // TODO
    // app.use(tracking);
  } catch (err) {
    logger.error(`MIDDLEWARES LOAD ERROR: ${err}`);
  }
}

async function connectToDb () {
  try {
    const { dbConnector } = container.cradle;
    await dbConnector.connect();
  } catch (err) {
    throw new Error(`ERROR CONNECTING TO DB: ${err}`);
  }
}

async function startApp (app) {
  try {
    await connectToDb();
    return app.listen(config.port, () => Promise.resolve());
  } catch (err) {
    logger.error(`STARTING APP ERROR: ${err}`);
    // await startApp(app);
  }
}

(async () => {
  try {
    app = express();
    initHelmetHeaders(app);
    initMiddleware(app);
    await startApp(app);
    systemInfo();
    logger.info(`Environment: ${config.env}`);
    logger.info(`Port: ${config.port}`);
    logger.info(`Server started at ${new Date().toISOString()}`);
    return app;
  } catch (err) {
    logger.error(err);
  }
})();

export default app;