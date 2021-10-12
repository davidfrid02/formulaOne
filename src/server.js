const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
morgan(':method :url :status :res[content-length] - :response-time ms');
app.use(require('./routes'));

module.exports = app;
