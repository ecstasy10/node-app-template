'use strict';

import jwt from 'jsonwebtoken';
import httpStatusCodes from 'http-status-codes';
import { asValue } from 'awilix';
import config from './../config.js';
import logger from './../logger.js';
import container from './../boot.js';

function _areUrlsEquals (urlDB, urlController) {
  const urlDBWithoutParams = urlDB.split('?')[0];
  const urlControllerWithoutParams = urlController.split('?')[0];
  if (urlDBWithoutParams === urlControllerWithoutParams) {
    return true;
  } else if (urlDB.includes('*')) {
    const urlDBSplit = urlDBWithoutParams.split('/');
    const urlControllerSplit = urlControllerWithoutParams.split('/');
    if (urlDBSplit.length !== urlControllerSplit.length) {
      return false;
    }
    for (const index in urlDBSplit) {
      if (urlDBSplit[index] !== '*' && urlDBSplit[index] !== urlControllerSplit[index]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function _endpointExistsByRequest (endpointList, req) {
  return endpointList.find(({ method, url }) =>
    method.toUpperCase() === req.method.toUpperCase() &&
        _areUrlsEquals(url, req.url));
}

function checkRoles (roles) {
  return (req, res, next) => {
    const { trackingService, httpContext } = req.container.cradle;
    const user = httpContext.get('user');
    if (user.profile.roles.find(role => roles.includes(role.name))) {
      next();
    } else {
      const { responses } = container.cradle;
      res.status(httpStatusCodes.FORBIDDEN).json(responses());
      req.path.includes('/api/') && trackingService.track({
        user,
        req,
        trackingInfo: {
          kpiId: 51004,
          description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${user.roleIds}`
        }
      });
    }
  };
}
  
async function isAuthenticated (req, res, next) {
  const { userService, httpContext } = req.container.cradle;
  try {
    if (!_endpointExistsByRequest(config.publicEndpoints, req)) {
      const { authorization } = req.cookies;
      const {
        user,
      } = jwt.verify(authorization && authorization.replace('Bearer ', ''), config.security.publicKey, { algorithms: [ 'RS512' ] });
      const userDB = await userService.get({ email: user.email });
      req.container.register({ user: asValue(userDB) });
      httpContext.set('user', userDB);
    }
    next();
  } catch (err) {
    logger.error(err);
    const { responses } = container.cradle;
    res.status(httpStatusCodes.UNAUTHORIZED).json(responses());
    // TODO
    // req.path.includes('/api/') && trackingService.track({
    //   user: null,
    //   req,
    //   trackingInfo: {
    //     kpiId: 51003,
    //     description: err.message,
    //   }
    // });
  }
}
  
async function isGranted (req, res, next) {
  const { userService, httpContext } = req.container.cradle;
  try {
    if (_endpointExistsByRequest(config.allowedEndpoints, req)) {
      next();
    } else {
      const user = httpContext.get('user');
      const endpoints = await userService.getEndpoints(user?._id);
      if (!_endpointExistsByRequest(endpoints, req)) {
        throw new Error('Endpoint is not granted by roles');
      }
      next();
    }
  } catch (err) {
    logger.error(err);
    const { responses } = container.cradle;
    res.status(httpStatusCodes.FORBIDDEN).json(responses());
    // TODO
    // const user = httpContext.get('user');
    // req.path.includes('/api/') && trackingService.track({
    //   user,
    //   req,
    //   trackingInfo: {
    //     kpiId: 51004,
    //     description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${user.roleIds}`
    //   }
    // });
  }
}

export { checkRoles, isAuthenticated, isGranted };
