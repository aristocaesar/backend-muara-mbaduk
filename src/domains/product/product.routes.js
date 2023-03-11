const { Router } = require('express');
const { ProductController } = require('./product.controllers');

const route = Router();

route.get('/', ProductController.get);
route.get('/:id', ProductController.getById);
route.post('/', ProductController.store);
route.put('/', ProductController.update);
route.delete('/', ProductController.delete);

module.exports = { productRoutes: route };
