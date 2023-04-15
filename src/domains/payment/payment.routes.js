const { Router } = require('express');
const { PaymentController } = require('./payment.controllers');

const router = Router();

router.get('/', PaymentController.get);
router.get('/:id', PaymentController.getById);
router.get('/user/:id', PaymentController.getByUser);
router.post('/:type', PaymentController.checkout);

module.exports = { paymentRoutes: router };
