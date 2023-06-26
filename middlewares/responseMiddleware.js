const { logger } = require("cca_logger");

const processResponse = (data, res) => {
  // check current response data.
  const responseData = JSON.parse(data);
  // if containing errors, no transform return immediately.
  if (responseData?.errors) {
    return JSON.stringify(responseData);
  }
  // if no errors assuming this is a successfull response.
  // transform the response.
  return JSON.stringify({
    status: "ok",
    errors: null,
    result: responseData,
  });
};

const responseMiddleware = (req, res, next) => {
  const reqPath = req?.url || "";
  const reqMethod = req?.method || "";
  // intercept the current request
  // get the current response.send function.
  const originalSend = res.send;
  // override the send function to apply post processing before sending the data.
  res.send = function () {
    // apply function to process/transform data.
    arguments[0] = processResponse(arguments[0], res);
    // apply transformation.
    originalSend.apply(res, arguments);
    logger.detail(`[${reqMethod}] ${reqPath} [Request Completed] Applied Response Transform.`);
  };
  // go to next middleware if any.
  next();
};

module.exports = responseMiddleware;
