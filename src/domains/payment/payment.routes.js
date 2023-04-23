const { Router } = require('express');
const { PaymentController } = require('./payment.controllers');

const router = Router();

router.get('/', PaymentController.get);
router.post('/notification', PaymentController.notification);
router.post('/change-status', PaymentController.changeStatus);

router.get('/:id', PaymentController.getById);
router.get('/:id/packages', PaymentController.getById);
router.get('/:id/tickets', PaymentController.getById);

router.get('/user/:id', PaymentController.getByUser);
router.post('/:type', PaymentController.checkout);

module.exports = { paymentRoutes: router };
