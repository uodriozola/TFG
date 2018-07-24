'use strict'

var express = require('express');
var huControlador = require('../controladores/hu');
var api = express.Router();

api.get('/hu/:id', huControlador.getHu);
api.get('/hus/hijos/:proyecto/:id', huControlador.getHijosTipo);
api.get('/hus/padres/:proyecto/:id', huControlador.getTipoPadres);
api.post('/hu/:proyecto', huControlador.saveHu);
api.get('/hus/:proyecto?', huControlador.getHus);
api.get('/hus/:proyecto/:iteracion', huControlador.getHusIter);
api.put('/hu/:id', huControlador.updateHu);
api.delete('/hu/:id', huControlador.deleteHu);

module.exports = api;