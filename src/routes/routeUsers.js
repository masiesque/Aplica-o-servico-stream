const Router = require('express').Router();

const metodosUsers = require('../controllers/controllerUsers');

Router.post('/cadastro',metodosUsers.createUser);

Router.get('/login',metodosUsers.loginUser);


module.exports=Router;