const { Router } = require('express');
const { ProductController } = require('./product.controlles');
const { uploadProduct } = require('../../utils/multer');

const route = Router();

route.get('/', ProductController.get);
route.get('/:id', ProductController.getById);
route.post('/', uploadProduct, ProductController.store);
route.put('/', uploadProduct, ProductController.update);
route.delete('/', ProductController.delete);

module.exports = { productRoutes: route };
