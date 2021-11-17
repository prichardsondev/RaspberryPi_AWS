var AWS = require("aws-sdk");

const credentials = new AWS.SharedIniFileCredentials({
  profile: "training",
});

AWS.config.credentials = credentials;

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazonaws.com",
});

let documentClient = new AWS.DynamoDB.DocumentClient();

let write = async (table, item) => {
  const params = {
    TableName: table,
    Item: item,
  };

  await documentClient.put(params).promise();
};

module.exports = write;