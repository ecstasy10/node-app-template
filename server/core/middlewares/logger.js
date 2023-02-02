'use strict';

import logger from './../logger.js';
import httpContext from 'express-http-context';

export default {
  init: (req, res, next) => {
    httpContext.set('method', req.method);
    httpContext.set('url', req.url);
    httpContext.set('traceId', require('uuid').v4());
    logger.info('accessing', { body: Object.assign({}, req.body, req.params, req.query), ip: req.ip });
    next();
  },
  end: (req, res, next) => {
    logger.info('end');
    next();
  }
};
