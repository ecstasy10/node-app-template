'use strict';

import httpContext from 'express-http-context';

export default function (data, entity) {
  return {
    traceId: httpContext.get('traceId'),
    data,
    entity,
  };
}