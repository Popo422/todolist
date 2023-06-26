const { deleteTask } = require("../../../dataIntegration/dynamoDbIntegration.js");

module.exports = async function deleteSelectedTasks(Id) {
  let user = await deleteTask(Id);
  return user;
};
