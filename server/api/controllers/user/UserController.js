'use strict';

const { createController } = require('awilix-express');
const {
  userValidator,
} = require('../../validators/user/UserValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class UserController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.userService = deps.userService;
    this.formatter = deps.formatter;
  }

  async getUsers (req, res, next) {
    try {
      const result = await this.userService.get();
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getUsers', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async getUserById (req, res, next) {
    try {
      const { id } = req.params;
      const { full } = req.query;
      const result = await this.userService.get({ _id: id }, true, undefined, full);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getUserById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async getUserHotelGroupsById (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.userService.getHotelGroups(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getUserById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async createUser (req, res, next) {
    try {
      const user = req.body;
      const result = await this.userService.upsert(user);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `user has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createUser', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async updateUser (req, res, next) {
    try {
      const user = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.userService.upsert(user);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `user has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateUser', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async deleteUser (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.userService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `user has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteUser', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

}

export default createController(UserController)
  .prefix('/users')
  .get('', 'getUsers')
  .get('/:id', 'getUserById', { before: [ paramIdValidator ] })
  .post('', 'createUser', { before: [ userValidator ] })
  .put('/:id', 'updateUser', { before: [ paramIdValidator, userValidator ] })
  .delete('/:id', 'deleteUser', { before: [ paramIdValidator ] });
