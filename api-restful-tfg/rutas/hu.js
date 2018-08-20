'use strict'

var express = require('express');
var huControlador = require('../controladores/hu');
var api = express.Router();

api.get('/hu/:id', huControlador.getHu);
api.get('/hus/hijos/:proyecto/:id', huControlador.getHijos);
api.get('/hus/descendientes/:proyecto/:id', huControlador.getDescendientes);
api.get('/hus/ascendientes/:proyecto/:id', huControlador.getAscendientes);
api.get('/hus/padres/:proyecto/:id', huControlador.getPadres);
api.post('/hu/:proyecto', huControlador.saveHu);
api.get('/hus/:proyecto?', huControlador.getHus);
api.get('/hus/:proyecto/:iteracion', huControlador.getHusIter);
api.put('/hu/:id', huControlador.updateHu);
api.delete('/hu/:proyecto/:id', huControlador.deleteHu);

module.exports = api;