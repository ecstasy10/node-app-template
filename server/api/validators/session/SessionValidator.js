'use strict';

const { body } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  loginValidator: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    coreValidator,
  ],
  registerValidator: [
    body('name').notEmpty().isString(),
    body('surname').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    coreValidator,
  ],
  forgotPasswordValidator: [
    body('email').notEmpty().isEmail(),
    coreValidator,
  ],
  forgotPasswordAcceptValidator: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    body('otp').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};
