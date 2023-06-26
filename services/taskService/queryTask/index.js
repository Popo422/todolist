const { queryTasks } = require("../../../dataIntegration/dynamoDbIntegration.js");

module.exports = async function queryAllTasks(Id) {
  let tasks = await queryTasks(Id);
  return tasks;
};
