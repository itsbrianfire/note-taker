const express = require('express');
const app = express();
const api = require('./api');

app.use('/notes', api);

module.exports = app;