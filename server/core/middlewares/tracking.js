'use strict';

export default  (req, res, next) => {
  const { trackingService, httpStatusCodes } = req.container.cradle;
  if (req.path.includes('/api/') && res.statusCode === httpStatusCodes.INTERNAL_SERVER_ERROR) {
    trackingService.track({ employee: null, req, trackingInfo: { kpiId: 50000 } });
  }
  next();
};
