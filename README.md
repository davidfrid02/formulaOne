## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

-   Git - [Download & Install Git](https://git-scm.com/downloads).
-   Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
-   PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/download/)

## Quick Start

Run git clone to this project

```bash
$ git clone https://github.com/davidfrid02/formulaOne.git
```

Navigate to the project root folder:

```bash
$ cd formulaOne
```

Install dependencies:

```bash
$ npm install
```

Before you run the command, Set the config file with the PostgreSQL details:

```bash
$ npm run load
```

Start the server:

```bash
$ npm run start
```

## Authentication

1) POST - http://localhost:3000/api/v1/register
```bash
  BODY:
  {
  "userName": "xxxx",
  "password": "yyyy",
}
RESPONSE:
{
  "status": "success" 
}
```

2) POST - http://localhost:3000/api/v1/login
```bash
  BODY:
  {
  "userName": "xxxx",
  "password": "yyyy",
  }
  RESPONSE:
  {
    "token": "zzzzzzzz"
  }
```


## ENDPOINTS
isAlive:
GET - http://localhost:3000/health - Check if the server is up.

Before these endpoints an identification must be added in the HEADER of the request
KEY - access-token
VALUE - token from login response

1. GET - http://localhost:3000/api/v1/seasons/:season/drivers - returns a list of drivers sorted by the wins in the requested season
EXAMPLE:
```
http://localhost:3000/api/v1/seasons/2002/drivers
```
2. GET - http://localhost:3000/api/v1/seasons?allTimeRanking=true - returns a list of seasons with the top 3 drivers in each season.
EXAMPLE:
```
http://localhost:3000/api/v1/seasons?allTimeRanking=true
```
3. GET - http://localhost:3000/api/v1/drivers/:driverParam/races - Get a specific driver by id or name(forename surname with space between) with all of his races sorted by date from newest to the oldest.
EXAMPLE:
```
http://localhost:3000/api/v1/drivers/30/races
```
