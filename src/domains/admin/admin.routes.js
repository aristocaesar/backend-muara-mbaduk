const { Router } = require('express');
const { AdminController } = require('./admin.controllers');

const router = Router();

router.get('/', AdminController.get);
router.get('/:id', AdminController.getById);
router.post('/', AdminController.store);
router.put('/:id', AdminController.update);
router.delete('/:id', AdminController.delete);
router.post('/sign-in', AdminController.signIn);

module.exports = { adminRoutes: router };
