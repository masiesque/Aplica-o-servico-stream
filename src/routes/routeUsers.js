const Router = require('express').Router();

const metodosUsers = require('../controllers/controllerUsers');

Router.post('/cadastro',metodosUsers.createUser);


module.exports=Router;