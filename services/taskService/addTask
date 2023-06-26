const { addTask } = require("../../../dataIntegration/dynamoDbIntegration.js");

module.exports = async function addNewTask(task) {
  let user = await addTask(task);
  return user;
};
