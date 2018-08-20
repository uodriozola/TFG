'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var huSchema = Schema({
    numero: Number,
    nombre: String,
    descripcion: String,
    tipo: String,
    iteracion: Number,
    posX: Number,
    posY: Number,
    tareas: {
        a1: { realizado: Boolean, habilitado: Boolean },
        a2: { realizado: Boolean, habilitado: Boolean },
        a3: { realizado: Boolean, habilitado: Boolean },
        finalizado: { realizado: Boolean, habilitado: Boolean }
    },
    padres: [{ type: Schema.ObjectId, ref: 'Hu' }],
    proyecto: { type: Schema.ObjectId, ref: 'Proyecto' }
});

module.exports = mongoose.model('Hu', huSchema);