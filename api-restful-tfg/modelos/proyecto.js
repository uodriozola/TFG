'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proyectoSchema = Schema({
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('Proyecto', proyectoSchema);