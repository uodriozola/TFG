'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proyectoSchema = Schema({
    nombre: String,
    descripcion: String,
    usuario: { type: Schema.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);