const {
  DynamoDBClient,
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const ddbClient = new DynamoDBClient({
  apiVersion: "2012-08-10",
  region: process.AWS_REGION,
});

const marshallOptions = {
  convertEmptyValues: true,
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
};

const queryTasks = async (id) => {
  try {
    const params = {
      TableName: process.env.toDoTable,
      IndexName: "id",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: marshall(
        {
          ":id": id,
        },
        marshallOptions
      ),
    };

    const { items } = await ddbClient.send(new QueryCommand(params));
    console.log("[QUERY]", await ddbClient.send(new QueryCommand(params)));
    const unmarshallItems = items.map((item) => {
      return unmarshall(item);
    });
    return unmarshallItems;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const queryAllTasks = async (clientKey) => {
  try {
    let key = clientKey;
    let result = [];;
    do {
      const params = {
        TableName: process.env.toDoTable,
        ExclusiveStartKey: key,
        Limit: 15, //returns 15 values from the starting ClientKey
      };
      const response = await ddbClient.send(new ScanCommand(params));
      key = response.LastEvaluatedKey;

      result = [
        ...result,
        response.Items.map((item) => {
          item = unmarshall(item);
          return item;
        }),
      ];
    } while (key != undefined);

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const addTask = async (task) => {
  try {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const params = {
      TableName: process.env.toDoTable,
      Item: marshall({ id, timestamp, task }, marshallOptions),
    };
    const { $metadata } = await ddbClient.send(new PutItemCommand(params));
    console.log(`Successfully added new Task`);
    return $metadata.httpStatusCode;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const updateTask = async (Id, details) => {
  try {
    const keys = Object.keys(details);
    const params = {
      TableName: process.env.toDoTable,
      Key: marshall(
        {
          Id,
        },
        marshallOptions
      ),
      UpdateExpression: `SET ${keys
        .map((_, index) => {
          const keyString = `#key${index}`;
          const valueString = `:value${index}`;
          return `${keyString} = ${valueString}`;
        })
        .join(", ")}`,
      ExpressionAttributeNames: keys.reduce(
        (acc, key, index) => ({
          ...acc,
          [`#key${index}`]: key,
        }),
        {}
      ),
      ExpressionAttributeValues: marshall(
        keys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`:value${index}`]: details[key],
          }),
          {}
        ),
        marshallOptions
      ),
    };
    const { $metadata } = await ddbClient.send(new UpdateItemCommand(params));
    console.log(`Successfully udpated task `, id);
    return $metadata.httpStatusCode;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteTask = async (id) => {
  try {
    const params = {
      TableName: process.env.toDoTable,
      Key: marshall(
        {
          id,
        },
        marshallOptions
      ),
    };
    const { $metadata } = await ddbClient.send(new DeleteItemCommand(params));
    console.log(`Deleted id `, id);
    return $metadata.httpStatusCode;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  queryAllTasks,
  queryTasks,
  updateTask,
  addTask,
  deleteTask,
};
