'use strict'

var express = require('express');
var iteracionControlador = require('../controladores/iteracion');
var api = express.Router();

api.get('/iteracion/:numero', iteracionControlador.getIteracion);
api.post('/iteracion/:proyecto', iteracionControlador.saveIteracion);
api.get('/iteraciones/:proyecto?', iteracionControlador.getIteraciones);
api.put('/iteracion/:id', iteracionControlador.updateIteracion);

module.exports = api;