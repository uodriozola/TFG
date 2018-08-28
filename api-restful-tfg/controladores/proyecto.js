'use strict'

var Iteracion = require('../modelos/iteracion');
var Hu = require('../modelos/hu');
var Proyecto = require('../modelos/proyecto');
var Usuario = require('../modelos/usuario');

function getProyecto(req, res) {
    var proyectoId = req.params.id;

    Proyecto.findById(proyectoId, (err, proyecto) => {
        if (err) {
            return res.status(500).send({message: "Error en la petición"});
        } else {
            if(!proyecto) {
                res.status(404).send("El proyecto no existe");
            } else {
                Usuario.populate(proyecto, {path: 'usuario'}, (err, proyecto) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send(proyecto);
                    }
                });
            }
        }
    });
}

function getProyectos(req, res) {
    var usuarioID = req.params.usuario;

    Proyecto.find({ usuario: usuarioID }, (err, proyectos) => {
        if (err) {
            return res.status(500).send({message: "Error en la petición"});
        } else {
            if(!proyectos) {
                res.status(404).send("No hay proyectos");
            } else {
                Usuario.populate(proyectos, {path: 'usuario'}, (err, proyectos) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send(proyectos);
                    }
                });
            }
        }
    });
}

function saveProyecto(req, res) {
    var proyecto = new Proyecto();

    var params = req.body;
    proyecto.nombre = params.nombre;
    proyecto.descripcion = params.descripcion;
    proyecto.usuario = params.username;

    proyecto.save((err, proyectoStored) => {
        if(err) {
            res.status(500).send({mesage: "Error al guardar el proyecto"});   
        } else {
            if(!proyectoStored) {
                res.status(404).send({message: "No se ha guardado el proyecto"});
            } else {
                res.status(200).send(proyectoStored);
            }
        }
    });
}

function updateProyecto(req, res) {
    var proyectoId = req.params.id;
    var update = req.body;

    Proyecto.findByIdAndUpdate(proyectoId, update, (err, proyectoUpdated) => {
        if(err) {
            res.status(500).send({mesage: "Error al actualizar el proyecto"});   
        } else {
            if(!proyectoUpdated) {
                res.status(404).send({message: "No se ha podido actualizar el proyecto"});
            } else {
                res.status(200).send(proyectoUpdated);
            }
        }
    });
}

function deleteProyecto(req, res) {
    var proyectoId = req.params.id;

    Proyecto.findByIdAndRemove(proyectoId, (err, proyectoRemoved) => {
        if(err) {
            res.status(500).send({mesage: "Error al eliminar el proyecto"});   
        } else {
            if(!proyectoRemoved) {
                res.status(404).send({message: "No se ha podido eliminar el proyecto"});
            } else {
                Hu.remove({proyecto: proyectoId}).exec();
                Iteracion.remove({proyecto: proyectoId}).exec();
                res.status(200).send(proyectoRemoved);
            }
        }
    });
}

module.exports = {
    getProyecto,
    getProyectos,
    saveProyecto,
    updateProyecto,
    deleteProyecto
};