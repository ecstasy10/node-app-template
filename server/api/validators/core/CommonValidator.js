'use strict';

const { param } = require('express-validator');
const { coreValidator } = require('./CoreValidator');

module.exports = {
  paramIdValidator: [
    param('id').notEmpty().isInt().toInt(),
    coreValidator,
  ],
  resourceValidator: [
    coreValidator,
  ],
};