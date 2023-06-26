
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");

const {
  queryAllTasks,
  queryTasks,
  addTask,
  deleteTask,
  updateTask,
} = require("../services/usersService");

userRouter.post("/addTask", async (req, res, next) => {
  try {
    const { task } = req.body;
    const data = await addTask(task);
    res.status(200).json(data);
    next();
  } catch (e) {
    next(e);
  }
});
userRouter.post("/deleteTask", async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await deleteTask(id);
    res.status(200).json(data);
    next();
  } catch (e) {
    next(e);
  }
});
userRouter.post("/updateTask", async (req, res, next) => {
  try {
    const { id,task } = req.body;
    const data = await updateTask(id,task);
    res.status(200).json(data);
    next();
  } catch (e) {
    next(e);
  }
});
userRouter.post("/queryTask", async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await queryTasks(id);
    res.status(200).json(data);
    next();
  } catch (e) {
    next(e);
  }
});
userRouter.post("/queryAllTask", async (req, res, next) => {
  try {
    const { clientStartkey } = req.body;
    const items = await queryAllTasks(lastEvaluatedKey);
    res.status(200).json(data);
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;
