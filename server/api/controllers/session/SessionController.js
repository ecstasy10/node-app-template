'use strict';

const { createController } = require('awilix-express');
const {
  loginValidator,
  registerValidator,
} = require('../../validators/session/SessionValidator');

class SessionController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.config = deps.config;
    this.responses = deps.responses;
    this.sessionService = deps.sessionService;
    this.formatter = deps.formatter;
    this.userService = deps.userService;
  }

  _cookieOptions () {
    return {
      maxAge: this.config.security.expirationTime * 1000,
      secure: this.config.security.cookieSessionSecure,
      httpOnly: true,
      sameSite: this.config.cors.sameSite ? 'lax' : 'none',
    };
  }

  async login (req, res, next) {
    try {
      const { email, password } = req.body;
      const { accessToken, tokenType } = await this.sessionService.login({ email, password });
      res.cookie('authorization', `${tokenType} ${accessToken}`, this._cookieOptions());
      res.status(this.httpStatusCodes.OK).json(this.responses({ authenticated: true }, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('login', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: [
      //     {
      //       kpiId: 50002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }, {
      //       kpiId: 51002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }
      //   ]
      // });
    } finally {
      next();
    }
  }

  async logout (req, res, next) {
    try {
      res.cookie('authorization', false, {
        maxAge: 0,
        httpOnly: true,
        secure: this.config.security.cookieSessionSecure,
      });
      res.status(this.httpStatusCodes.OK).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 11 } });
    } catch (err) {
      this.logger.error('logout', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async register (req, res, next) {
    try {
      const newUser = req.body;
      await this.sessionService.register(newUser);
      res.status(this.httpStatusCodes.OK).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('register', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: [
      //     {
      //       kpiId: 50002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }, {
      //       kpiId: 51002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }
      //   ]
      // });
    } finally {
      next();
    }
  }

  async getMe (req, res, next) {
    try {
      const { full } = req.query;
      const { user } = req.container.cradle;
      if (full) {
        const fullUser = await this.userService.getFullSessionUser(user._id);
        res.status(this.httpStatusCodes.OK).json(this.responses(fullUser, this.formatter.requestEntity(req)));
      } else {
        res.status(this.httpStatusCodes.OK).json(this.responses(user, this.formatter.requestEntity(req)));
      }
    } catch (err) {
      this.logger.error('getUserById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

}

export default createController(SessionController)
  .prefix('/session')
  .post('/login', 'login', { before: [ loginValidator ] })
  .post('/logout', 'logout')
  .post('/register', 'register', { before: [ registerValidator ] })
  .get('/me', 'getMe');
