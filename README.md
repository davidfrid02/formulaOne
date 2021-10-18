## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

-   Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
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

Create a database and a user in PostgreSQL and then run the following command to load csv files to DB:

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
GET - http://localhost:3000/health - Check if the server is alive

Before these endpoints an identification must be added in the header
key - access-token
value - token
1. GET - http://localhost:3000/api/v1/seasons/:season/drivers - returns a list of drivers sorted by the wins in the requested season
2. GET - http://localhost:3000/api/v1/seasons?allTimeRanking=true - returns a list of seasons with the top 3 drivers in each season
3. GET - http://localhost:3000/api/v1/drivers/:driverParam/races - Get a specific driver (by id/name) with all of his races sorted by date from newest to the oldest
