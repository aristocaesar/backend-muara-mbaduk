require('dotenv').config();
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { Authentication } = require('./middleware/authentication');
const { testimonyRoutes } = require('./domains/testimony/testimony.routes');

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// Set informastion header
app.use((req, res, next) => {
  res.set({
    'X-Powered-By': 'DKODE Creative',
  });
  next();
});

// Set static folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// Authentication
app.use(Authentication);

// Routes ( Version 1 )
app.use('/api/v1/testimony', testimonyRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
});

exports.app = app;
