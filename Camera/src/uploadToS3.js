var AWS = require("aws-sdk");
var fs = (fs = require("fs"));

const credentials = new AWS.SharedIniFileCredentials({ profile: "training" });
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-east-1" });

var s3 = new AWS.S3();

const uploadFile = async (fileName,bucketName) => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: data
    };

    var putObjectPromise = s3.upload(params).promise();

    putObjectPromise
      .then(function(data) {
        console.log("Image uploaded");
      })
      .catch(function(err) {
        console.log(err);
      });

  });

  return("hello");
};

module.exports.uploadFile = uploadFile;