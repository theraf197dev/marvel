# Fullstack React App using Marvel Comics API


## Available Scripts

For it to work, you need to run the following commands in order:


## Install and Start API:

### `cd marvel-connector`
### `npm install`

You need to create a file called '.env' with your PrivateKey from marvelAPI:

SECRET_KEY = [private_key]


And then start it:

### `npm start`


## Install and Start Database:
### `cd ../back`
### `npm install`
### `npm install mysql`

## Create Database :
### `mysql -u [username] -p < bbdd.sql`

And the password you have set
Then you have to create a file called '.env' with this format:

USER = [username]

PASSWORD = [password]


And then start it:

### `npm start`

## Install and Start Front:
### `cd ../front`
### `npm install`
### `npm start`


## Requirements
* Ports 3000, 3001 and 8080 need to be free.
* Have MySQL Shell installed


