const express = require('express');

const api = require('./api');
const app = express();

app.use('/notes', api);

module.exports = app;