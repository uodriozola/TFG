'use strict'

var passport = require('passport');
var Usuario = require('../modelos/usuario');

function saveUsuario(req, res) {
    var usuario = new Usuario();

    var params = req.body;
    usuario.email = params.email;
    usuario.username = params.username;
    usuario.password = Usuario.hashPassword(params.password);
    usuario.fechaCreacion = Date.now();

    Usuario.findOne({ username: usuario.username }, (err, user) => {
        if (err) {
            res.status(500).send({mesage: "Error al registrar el usuario"});
        } else if (user) {
            res.status(401).send({mesage: "El nombre de usuario ya existe"});
        } else {
            usuario.save((err, usuarioStored) => {

                if (err) {
                    res.status(500).send({ mesage: "Error al crear la cuenta" });
                } else {
                    if (!usuarioStored) {
                        res.status(404).send({ message: "No se ha creado la cuenta" });
                    } else {
                        res.status(200).send(usuarioStored);
                    }
                }
            });
        }
    });
}

function loginUsuario(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(500).send({ message: "Error al hacer login" }); }
        if (!user) { return res.status(500).send(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(500).send({ message: "Error al hacer login" }); }
            return res.status(200).send({ message: "Login correcto" });
        });
    })(req, res, next);
}

function getUsuario(req, res) {
    return res.status(200).send(req.user);
}

function logoutUsuario(req, res) {
    req.logout();
    return res.status(200).send({message: 'Deslogueado correctamente'});
}

function esValidoUsuario(req, res, next) {
    if(req.isAuthenticated()) next();
    else return res.status(401).send({message: 'Petición no autorizada'});
}

module.exports = {
    saveUsuario,
    loginUsuario,
    getUsuario,
    logoutUsuario,
    esValidoUsuario
};