import AWS from 'aws-sdk';
import { v4 } from 'uuid';
const uuid = v4();

AWS.config.update({ region: 'eu-west-1' });

const dynamo = new AWS.DynamoDB.DocumentClient();

const put = async (TableName, Item) => {
  const params = {
    TableName,
    Item,
  };
  return dynamo.put(params).promise();
};

function generateRandomText(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let text = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    text += characters.charAt(randomIndex);
  }

  return text;
}

for (let i = 0; i < 5; i++) {
  const id = `${uuid}`;

  const product = {
    id: id,
    title: generateRandomText(10),
    description: generateRandomText(100),
    price: Math.floor(Math.random() * 1000),
  };

  put('products', product);

  const stock = {
    product_id: id,
    count: Math.floor(Math.random() * 100),
  };

  put('stocks', stock);
}