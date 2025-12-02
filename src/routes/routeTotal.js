const Router = require('express').Router();
const auth = require ("../middlewares/authMiddleware");
const metodosUsers = require('../controllers/controllerUsers');
const metodosProfiles= require('../controllers/controllerProfiles');
//rotas usuarios
Router.post('/cadastro', metodosUsers.createUser);
Router.get('/login', metodosUsers.loginUser);
//rotas usuarios

//rotas profiles
Router.post('/profile',auth, metodosProfiles.createProfile);
Router.get('/profile/get',auth, metodosProfiles.getAllProfilesInOneUser);
Router.put("/profile/:profileId",auth, metodosProfiles.uptadeProfile);
//rotas profiles
module.exports=Router;