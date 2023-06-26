const queryAllTasks = require("./queryTask");
const addNewTask = require("./addTask");
const deleteSelectedTask = require("./deleteTask");
const updateSelectedTasks = require("./updateTask");
const queryAllTasksToClient = require("./queryAllTasks");

module.exports.queryTasks = async (id) => {
  const result = await queryAllTasks(id);
  return result;
};

module.exports.addTask = async ( task) => {
  const result = await addNewTask(task);
  return result;
};

module.exports.deleteTask = async (id) => {
  const result = await deleteSelectedTask(id);
  return result;
};
module.exports.updateTask = async (id,task) => {
  const result = await updateSelectedTasks(id,task);
  return result;
};

module.exports.queryAllTasks = async (clientStartkey) => {
  const result = await queryAllTasksToClient(clientStartkey);
  return result;
};


