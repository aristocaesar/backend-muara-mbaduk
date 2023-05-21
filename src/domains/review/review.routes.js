const { Router } = require('express');
const { ReviewController } = require('./review.controllers');

const router = Router();

router.get('/', ReviewController.get);
router.get('/package/:id', ReviewController.getByPackage);
router.get('/:id', ReviewController.getById);
router.post('/', ReviewController.store);
router.put('/:id', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = { reviewRoutes: router };
