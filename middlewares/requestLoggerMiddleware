const { logger } = require("cca_logger");

const requestLoggerMiddleware = (req, res, next) => {
  const reqPath = req?.url || "";
  const reqMethod = req?.method || "";
  logger.detail(`[${reqMethod}] ${reqPath} [Request Received] Processing Request.`, req);

  // go to next middleware if any.
  next();
};

module.exports = requestLoggerMiddleware;
