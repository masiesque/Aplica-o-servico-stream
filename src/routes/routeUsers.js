const Router = require('express').Router();

const metodosUsers = require('../controllers/controllerUser');

Router.get('/cadastro',metodosUsers.createUser);


module.exports=Router;