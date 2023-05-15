const { Router } = require('express');
const { UserController } = require('./user.controllers');

const route = Router();

route.get('/', UserController.get);
route.post('/account', UserController.account);
route.get('/logout', UserController.logout);
route.post('/login', UserController.login);
route.get('/:id', UserController.getById);
route.put('/:id/change-access', UserController.changeAccess);

module.exports = { userRoutes: route };
