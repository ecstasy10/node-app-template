'use strict';

const { body } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  userValidator: [
    // TEMPLATE FOR VALIDATOR
    // body('COMPULSORY').notEmpty().isString(),
    // body('OPTIONAL').optional({ nullable: true }).isString(),
    // body('DATE').notEmpty().isISO8601({ strict: true, strictSeparator: true }).toDate(),
    // body('ENUM').notEmpty().isString().isIn([ 'TOD', 'BTO' ]),
    // body('ID').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};
