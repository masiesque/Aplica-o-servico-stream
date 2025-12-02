const Router = require('express').Router();
const auth = require ("../middlewares/authMiddleware");
const metodosUsers = require('../controllers/controllerUsers');
const metodosProfiles= require('../controllers/controllerProfiles');
//rotas usuarios
Router.post('/cadastro',auth, metodosUsers.createUser);
Router.get('/login',auth, metodosUsers.loginUser);
//rotas usuarios

//rotas profiles
Router.post('/profile',auth, metodosProfiles.createProfile);

//rotas profiles
module.exports=Router;