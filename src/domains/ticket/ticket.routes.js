const { Router } = require('express');
const { TicketController } = require('./ticket.controllers');

const router = Router();

router.get('/', TicketController.get);
router.get('/:id', TicketController.getById);
router.get('/category/:category', TicketController.getByCategory);
router.post('/', TicketController.store);
router.post('/checkin/', TicketController.checkin);
router.put('/:id', TicketController.update);
router.delete('/:id', TicketController.delete);

module.exports = { ticketRoutes: router };
