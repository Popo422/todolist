const { queryAllTasks } = require("../../../dataIntegration/dynamoDbIntegration.js");

module.exports = async function queryAllTasksToClient(clientKey) {
  let tasks = await queryAllTasks(clientKey);
  return tasks;
};
