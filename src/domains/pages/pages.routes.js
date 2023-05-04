const { Router } = require('express');
const { PagesController } = require('./pages.controllers');

const route = Router();

route.get('/', PagesController.get);
route.get('/:id', PagesController.getByIdOrSlug);
route.post('/', PagesController.store);
route.put('/:id', PagesController.update);
route.delete('/:id', PagesController.delete);

module.exports = { pagesRoutes: route };
