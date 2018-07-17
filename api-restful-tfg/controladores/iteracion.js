'use strict'

var Iteracion = require('../modelos/iteracion');
// var Hu = require('../modelos/hu');
var Proyecto = require('../modelos/proyecto');

function getIteracion(req, res) {
    var iteracionId = req.params.numero;

    var find = Iteracion.findOne( { numero: iteracionId});

    find.exec((err, iteracion) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!iteracion) {
                res.status(404).send({message: "No existe la Iteración"});
            } else {
                Proyecto.populate(iteracion, {path: 'proyecto'}, (err, iteracion) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send({iteracion});
                    }
                });
            }
        }
    });
}

function getIteraciones(req, res) {
    var proyectoId = req.params.proyecto;

    if(!proyectoId) {
        //Sacar todas las Iteraciones de la base de datos
        var find = Iteracion.find({}).sort('nombre');
    } else {
        //Sacar las iteraciones asociadas al proyecto
        var find = Iteracion.find({proyecto: proyectoId}).sort('nombre');
    }

    find.exec((err, iteraciones) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!iteraciones) {
                res.status(404).send({message: "No hay Historias de Usuario en este proyecto"});
            } else {
                Proyecto.populate(iteraciones, {path: 'proyecto'}, (err, iteraciones) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send({iteraciones});
                    }
                });
            }
        }
    });
}

function saveIteracion(req, res) {
    var iteracion = new Iteracion();

    var params = req.body;
    iteracion.numero = params.numero;
    iteracion.nombre = params.nombre;
    iteracion.descripcion = params.descripcion;
    iteracion.posXizq = params.posXizq;
    iteracion.posXder = params.posXder;
    iteracion.posY = params.posY;
    iteracion.proyecto = params.proyectoID;

    iteracion.save((err, iteracionStored) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!iteracionStored) {
                res.status(404).send({message: "No se ha guardado la Historia de Usuario"});
            } else {
                res.status(200).send({iteracion: iteracionStored});
            }
        }
    });
}

function updateIteracion(req, res) {
    var iteracionId = req.params.id;
    var update = req.body;

    Iteracion.findByIdAndUpdate(iteracionId, update, (err, iteracionUpdated) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!iteracionUpdated) {
                res.status(404).send({message: "No se ha actualizado la Historia de Usuario"});
            } else {
                res.status(200).send({iteracion: iteracionUpdated});
            }
        }
    });
}

module.exports = {
    getIteracion,
    getIteraciones,
    saveIteracion,
    updateIteracion
};