'use strict';

import responses from '../../../core/responses';
import { requestEntity } from '../../../core/utils/formatter';

const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

module.exports = {
  coreValidator: (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      let { errors } = errorValidation;
      errors = errors.reduce((acc, error) => {
        const foundError = acc.find(errorIt => errorIt.param === error.param);
        if (error.msg !== foundError?.msg) {
          acc.push(error);
        }
        return acc;
      }, []);
      return res.status(StatusCodes.BAD_REQUEST).json(responses(errors, requestEntity(req)));
    } else {
      next();
    }
  },
};