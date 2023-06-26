const { logger } = require("cca_logger");

const errorMiddleware = (err, req, res, next) => {
  // for aws SDK Exception status code are included in the exception.
  // if a default exception was thrown without a code, 500 will be default.
  const exceptionHttpCode = err?.statusCode || 500;

  const reqPath = req?.url || "";
  const reqMethod = req?.method || "";
  logger.error(`[${reqMethod}] ${reqPath} [Request Failed] An exception occurred during the request.`, err);

  const errorResponse = {
    status: "err",
    errors: {
      userMessage: "There was a problem encountered during your request. Please try again later or contact support.",
      supportMessage: err.name,
      code: exceptionHttpCode,
      moreInfo: "",
    },
    result: null,
  };
  res.status(exceptionHttpCode).json(errorResponse);
};

module.exports = errorMiddleware;
