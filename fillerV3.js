import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 } from 'uuid';
const uuid = v4();

const client = new DynamoDBClient({ region: 'eu-west-1' });

const put = async (TableName, Item) => {
  const params = {
    TableName,
    Item,
  };
   await client.send(new PutItemCommand(params));
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

  await put('products', product);

  const stock = {
    product_id: id,
    count: Math.floor(Math.random() * 100),
  };

  await put('stocks', stock);
}
