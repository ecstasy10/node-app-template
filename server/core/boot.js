'use strict';

require('dotenv').config();
const config = require('./config');
const handlebars = require('./utils/handlebars');
import responses from './responses.js';
import logger from './logger.js';
import DBConnector from './connectors/dbConnector/index.js';
import * as formatter from './utils/formatter';

import { Lifetime, asClass, asFunction, asValue, createContainer } from 'awilix';
import httpContext from 'express-http-context';
import fs from 'fs';
import ipLocation from 'geoip-lite';
import path from 'path';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import HttpStatusCodes from 'http-status-codes';
import moment from 'moment';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import nodeRSA from 'node-rsa';
import axios from 'axios';
import crypto from 'crypto';
// const AWS = require('aws-sdk');
// const spacesEndpoint = new AWS.Endpoint(`${config.spacesConfig.region}.${config.spacesConfig.endpoint}`);
// const S3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: config.spacesConfig.accessKeyId,
//   secretAccessKey: config.spacesConfig.secretAccessKey,
// });

const container = createContainer();

container.register({

  dbConnector: asClass(DBConnector).singleton(),
  httpStatusCodes: asValue(HttpStatusCodes),
  httpContext: asValue(httpContext),
  fs: asValue(fs),
  ipLocation: asValue(ipLocation),
  handlebars: asValue(handlebars),
  smtpTransport: asValue(smtpTransport),
  path: asValue(path),
  nodemailer: asValue(nodemailer),
  moment: asValue(moment),
  logger: asValue(logger),
  crypto: asValue(crypto),
  axios: asValue(axios),
  jwt: asValue(jwt),
  encryptor: asValue(nodeRSA),
  config: asValue(config),
  responses: asValue(responses),
  google: asValue(google),
  formatter: asValue(formatter),
  // s3: asValue(S3),

});

container.loadModules([
  './../api/services/**/*.js',
  './../api/repositories/**/*.js',
  [ './../api/dao/**/*.js', { register: asFunction } ],
], {
  formatName: 'camelCase',
  cwd: __dirname,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass
  }
});

export default container;
