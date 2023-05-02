const { Router } = require('express');
const { FaqController } = require('./faq.controllers');

const route = Router();

route.get('/', FaqController.get);
route.get('/:id', FaqController.getById);
route.post('/', FaqController.store);
route.put('/:id', FaqController.update);
route.delete('/:id', FaqController.delete);

module.exports = { faqRoutes: route };
