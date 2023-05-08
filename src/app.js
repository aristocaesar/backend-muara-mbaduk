require('dotenv').config();
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const { Authorization } = require('./middleware/authorization');
const { requestBodyError } = require('./middleware/handle.requestBodyError');

const { testimonyRoutes } = require('./domains/testimony/testimony.routes');
const { productRoutes } = require('./domains/product/product.routes');
const { uploadRoutes } = require('./domains/upload/upload.routes');
const { packageRoutes } = require('./domains/package/package.routes');
const { adminRoutes } = require('./domains/admin/admin.routes');
const { newsRoutes } = require('./domains/news/news.routes');
const { userRoutes } = require('./domains/user/user.routes');
const { reviewRoutes } = require('./domains/review/review.routes');
const { ticketRoutes } = require('./domains/ticket/ticket.routes');
const { paymentRoutes } = require('./domains/payment/payment.routes');
const { faqRoutes } = require('./domains/faq/faq.routes');
const { pagesRoutes } = require('./domains/pages/pages.routes');

app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// allow parse x-www-form-urlencoded / multipart/form-data
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
// app.use(Authorization);
// Handle Main Error
app.use(requestBodyError);

// Routes ( Version 1 )
app.use('/v1/uploads', uploadRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/packages', packageRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/news', newsRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/testimonies', testimonyRoutes);
app.use('/v1/reviews', reviewRoutes);
app.use('/v1/tickets', ticketRoutes);
app.use('/v1/payments', paymentRoutes);
app.use('/v1/faq', faqRoutes);
app.use('/v1/pages', pagesRoutes);

app.get('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Route not found',
  });
});

exports.app = app;
