const { Router } = require('express');
const { NewsController } = require('./news.controllers');

const router = Router();

router.get('/', NewsController.get);
router.get('/:slug', NewsController.getBySlug);
router.post('/', NewsController.store);
router.put('/:slug', NewsController.update);
router.delete('/:slug', NewsController.delete);

module.exports = { newsRoutes: router };
