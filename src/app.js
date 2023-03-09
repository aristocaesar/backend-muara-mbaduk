require('dotenv').config();
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const { Authentication } = require('./middleware/authentication');

const { testimonyRoutes } = require('./domains/testimony/testimony.routes');
const { productRoutes } = require('./domains/product/product.routes');

app.use(compression());
app.use(cors());
// allow parse x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// allow parse application/json
app.use(express.json());

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
app.use('/api/v1/testimonies', testimonyRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/packages', () => {});

app.get('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Route not found',
  });
});

exports.app = app;
