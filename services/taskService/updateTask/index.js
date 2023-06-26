const { updateTask } = require("../../../dataIntegration/dynamoDbIntegration.js");

module.exports = async function updateTasks(id,task) {
  let user = await updateTask(id, task);
  return user;
};
