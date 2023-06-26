const express = require("express");
const userRouter = require("./routers/userRouter");
const reportsRouter = require("./routers/reportsRouter");

const stageName = process.env.stageName;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const requestLoggerMiddleware = require("./middlewares/requestLoggerMiddleware");
app.use(requestLoggerMiddleware);


const responseMiddleware = require("./middlewares/responseMiddleware");
app.use(responseMiddleware);


app.use(`/${stageName}/auth`, userRouter);

const errorMiddleware = require("./middlewares/errorMiddleware");
app.use(errorMiddleware);

module.exports = app;