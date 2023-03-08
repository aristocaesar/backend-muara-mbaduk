const { Router } = require('express');
const { TestimonyController } = require('./testmony.controllers');

const router = Router();

router.get('/', TestimonyController.get);

module.exports = { testimonyRoutes: router };
