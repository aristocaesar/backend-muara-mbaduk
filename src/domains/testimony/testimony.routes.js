const { Router } = require('express');
const { TestimonyController } = require('./testmony.controllers');

const router = Router();

router.get('/', TestimonyController.get);
router.get('/:id', TestimonyController.getById);
router.post('/', TestimonyController.store);
router.put('/:id', TestimonyController.update);
router.delete('/:id', TestimonyController.delete);

module.exports = { testimonyRoutes: router };
