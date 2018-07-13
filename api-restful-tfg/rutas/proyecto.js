'use strict'

var express = require('express');
var proyectoControlador = require('../controladores/proyecto');
var api = express.Router();

api.get('/proyecto/:id', proyectoControlador.getProyecto);
api.get('/proyectos', proyectoControlador.getProyectos);
api.post('/proyecto', proyectoControlador.saveProyecto);
api.put('/proyecto/:id', proyectoControlador.updateProyecto);
api.delete('/proyecto/:id', proyectoControlador.deleteProyecto);

module.exports = api;