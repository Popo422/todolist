const serverlessExpress = require("@vendia/serverless-express");
// get express application configuration.
const app = require('./app.js');
// cca logger library
const { logger } = require('cca_logger');
// create server outside of handler for server instance to be reused on next request.
const server = serverlessExpress({ app, resolutionMode: "PROMISE" });

// Handler for Lambda Function.
exports.handler = (event,context) => {
    logger.event(event);
    return server(event,context);
};
