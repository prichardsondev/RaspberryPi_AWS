## Push temp data from dht22 on PI to DynamoDB table paul_tempdata
### run commands starting with $ at PI terminal - don't copy $

## Install nodejs
### I like nodesource github.com/nodesource/distributions
```
$ curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
## Install awscli
### note this is v1.22 - you'd need to cmake git repo to get v2

```
$ pip install awscli

$ export PATH=/home/pi/.local/bin:$PATH

$ aws --version
aws-cli/1.22.7 Python/3.9.2 Linux/5.10.63-v7l+ botocore/1.23.7

$ aws configure --profile yourprofile
AWS Access Key ID [None]: youraccesskey
AWS Secret Access Key [None]: yoursecretkey
Default region name [None]: us-east-1
Default output format [None]: json

$ aws s3 ls --profile yourprofile
```
## connect DHT 11 temp sensor to Raspberry PI
| Sensor Pin   | PI  Pin  |
|--------------|----------|
|      -       | Ground   |
|      +       | 5V       |
|     out      | GPIO 4   |

![Pic](/img/PiTempSensor.png)


## To Run
```
$ git clone https://github.com/prichardsondev/RaspberryPi_AWS.git
$ cd RaspberryPi_AWS/Temp
$ npm i
$ sudo nano writeToDynamo.js
  add your aws profile name
  ctrl + x
  y
$ sudo nano app.js
  modify PK:YourOfficeTemp ex. PK:SallyOfficeTemp
  ctrl + x
  y

$ node app.js

browse to yourIP:3000/temp

```

## Dynamo - paul_tempdata
```
Main Table

Partition Key "PK" string
Sort Key "SK" string

Index

Name GSI1
Partition Key "PK" string
Sort Key "Temperature" string

