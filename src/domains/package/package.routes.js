const { Router } = require('express');
const { PackageController } = require('./package.controllers');

const route = Router();

/**
 * Route packages
 */
route.get('/', PackageController.get);
route.get('/:slug', PackageController.getBySlug);
route.get('/category/:category', PackageController.getByCategory);

route.post('/', PackageController.store);

route.put('/:slug', PackageController.update);
route.delete('/:slug', PackageController.delete);

/**
 * Route detail packages
 */
route.post('/:slug/store-product', PackageController.storeProduct);
route.put('/:slug/update-product/:id', PackageController.updateProductQuantity);
route.delete('/:slug/delete-product/:id', PackageController.deleteProduct);

module.exports = { packageRoutes: route };
