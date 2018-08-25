'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var usuarioSchema = Schema({
    email: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    fechaCreacion: {type: Date, require: true}
});

// Encriptamos el password
usuarioSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

// Comprobamos si el password que está usando el usuario es igual al que está guardado en la BD
usuarioSchema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model('usuario', usuarioSchema);