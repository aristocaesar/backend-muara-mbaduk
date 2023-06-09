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
route.delete('/:id', PackageController.delete);

route.get('/product-not-avaible/:id', PackageController.getProductNotAvaible);

/**
 * Route detail packages
 */
route.post('/:slug/store-product', PackageController.storeProduct);
route.put('/:slug/update-product/:id', PackageController.updateProductQuantity);
route.delete('/:slug/delete-product/:id', PackageController.deleteProduct);

module.exports = { packageRoutes: route };
