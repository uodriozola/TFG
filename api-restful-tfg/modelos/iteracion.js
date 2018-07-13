'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var iteracionSchema = Schema({
    numero: Number,
    nombre: String,
    descripcion: String,
    posXizq: Number,
    posXder: Number,
    posY: Number,
    proyecto: { type: Schema.ObjectId, ref: 'Proyecto' }
});

module.exports = mongoose.model('Iteracion', iteracionSchema);