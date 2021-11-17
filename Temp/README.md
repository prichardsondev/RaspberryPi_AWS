## Push temp data from dht22 on PI to DynamoDB
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

## Dynamo - I'll update to show creation
```
Main Table

Partition Key "PK" string
Sort Key "SK" string

Index

Name GSI1
Partition Key "PK" string
Sort Key "Temperature" string

