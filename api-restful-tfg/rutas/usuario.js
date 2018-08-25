'use strict'

var express = require('express');
var usuarioControlador = require('../controladores/usuario');
var api = express.Router();

api.post('/registro', usuarioControlador.saveUsuario);
api.post('/login', usuarioControlador.loginUsuario);
api.get('/usuario', usuarioControlador.esValidoUsuario, usuarioControlador.getUsuario);
api.get('/logout', usuarioControlador.esValidoUsuario, usuarioControlador.logoutUsuario);

module.exports = api;