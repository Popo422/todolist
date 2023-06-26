// Entrypoint Script.
const app = require('./app.js');
const port = process.env.port
const { logger } = require('cca_logger');

app.listen(port, () => logger.log(`Listening on ${process.env.port}`))