const express = require('express');
const app = express();

const KSUID = require("ksuid");

const writeToDynamo = require('./writeToDynamo');
const sensor = require("node-dht-sensor");

//endpoint to write current temp to dynamodb
app.get('/temp', (req, res) => {

  sensor.read(11, 4, async (err, temperature) => {

    console.log("temp", temperature);
    let SK = await KSUID.random();
    SK = SK.string;

    if (!err) {

      let Item = {
        PK: "YourOfficeTemp",
        SK:SK,
        Temperature: parseFloat((temperature*1.8)+32),
      };

      try {
        await writeToDynamo("paul_tempdata", Item);
        res.end(`${JSON.stringify(Item,null,3)} written to DynamoDB`);
      } catch (error) {
        console.log(error);
      }
    }
  });
});


app.listen(3000, () => {
  console.log('listening on port 3000');
});
