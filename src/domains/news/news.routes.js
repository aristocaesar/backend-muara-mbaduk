const { Router } = require('express');
const { NewsController } = require('./news.controllers');

const router = Router();

router.get('/', NewsController.get);
router.get('/:id', NewsController.getById);
router.post('/', NewsController.store);
router.put('/:id', NewsController.update);
router.delete('/:id', NewsController.delete);

module.exports = { newsRoutes: router };
