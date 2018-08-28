'use strict';

// var Iteracion = require('../modelos/iteracion');
var Hu = require('../modelos/hu');
var Proyecto = require('../modelos/proyecto');

var async = require('async');

function getHu(req, res) {
    var huId = req.params.id;

    Hu.findById(huId, (err, hu) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!hu) {
                res.status(404).send({ message: "No existe la Historia de Usuario" });
            } else {
                Proyecto.populate(hu, { path: 'proyecto' }, (err, hu) => {
                    if (err) {
                        res.status(500).send({ message: "Error en la petición" });
                    } else {
                        res.status(200).send(hu);
                    }
                });
            }
        }
    });
}

function getHus(req, res) {
    var proyectoId = req.params.proyecto;

    if (!proyectoId) {
        //Sacar todas las hu de la base de datos
        var find = Hu.find({}).sort('nombre');
    } else {
        //Sacar las hu asociadas al proyecto
        var find = Hu.find({ proyecto: proyectoId }).sort('nombre');
    }

    find.exec((err, hus) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!hus) {
                res.status(404).send({ message: "No hay Historias de Usuario en este proyecto" });
            } else {
                Proyecto.populate(hus, { path: 'proyecto' }, (err, hus) => {
                    if (err) {
                        res.status(500).send({ message: "Error en la petición" });
                    } else {
                        res.status(200).send(hus);
                    }
                });
            }
        }
    });
}

function getHusIter(req, res) {
    var proyectoId = req.params.proyecto;
    var iteracionId = req.params.iteracion;

    var find = Hu.find({ proyecto: proyectoId, iteracion: iteracionId }).sort('nombre');

    find.exec((err, hus) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!hus) {
                res.status(404).send({ message: "No hay Historias de Usuario en este proyecto" });
            } else {
                Proyecto.populate(hus, { path: 'proyecto' }, (err, hus) => {
                    if (err) {
                        res.status(500).send({ message: "Error en la petición" });
                    } else {
                        res.status(200).send(hus);
                    }
                });
            }
        }
    });
}

function getAscendientes(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;

    let ascendientes = [];
    let ids = [huID];
    let count = 0;

    async.whilst(
        () => {
            return count < ids.length
        },
        (cb) => {
            Hu.find({ proyecto: proyectoId, _id: ids[count] }, 'padres')
                .exec((err, val) => {
                    Hu.find({ proyecto: proyectoId, _id: { $in: val[0].padres } })
                        .exec((err, doc) => {
                            doc.forEach(elem => {
                                if (elem.tipo === 'Division') {
                                ascendientes.push(elem);
                                ids.push(elem._id);
                            }
                            });
                            count++;
                            cb();
                        });
                });
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            res.status(200).send(ascendientes);
        });
}

function getDescendientes(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;

    let descendientes = [];
    let ids = [huID];
    let count = 0;

    async.whilst(
        () => {
            return count < ids.length
        },
        (cb) => {
            Hu.find({ proyecto: proyectoId, padres: ids[count] }).exec((err, doc) => {
                doc.forEach(elem => {
                    if (elem.tipo !== 'Fusion' && elem.tipo !== 'Incrementado') {
                        descendientes.push(elem);
                        ids.push(elem._id);
                    }
                });
                count++;
                cb();
            });
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            res.status(200).send(descendientes);
        });
}


function getHijos(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;
    //Sacar los ID de las HU del proyecto que tienen de padre huID y su tipo
    var find = Hu.find({ proyecto: proyectoId, padres: huID });

    find.exec((err, hus) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!hus) {
                res.status(404).send({ message: "No hay Historias de Usuario en este proyecto" });
            } else {
                Proyecto.populate(hus, { path: 'proyecto' }, (err, hus) => {
                    if (err) {
                        res.status(500).send({ message: "Error en la petición" });
                    } else {
                        res.status(200).send(hus);
                    }
                });
            }
        }
    });
}



function getPadres(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;
    //Sacar las HU que son padres de huID
    Hu.
        find({ proyecto: proyectoId, _id: huID }, { '_id': 0, 'padres': 1 }).
        populate('padres').
        exec((err, hus) => {
            if (err) {
                res.status(500).send({ message: "Error en la petición" });
            } else {
                if (!hus) {
                    res.status(404).send({ message: "No hay Historias de Usuario en este proyecto" });
                } else {
                    res.status(200).send(hus[0].padres);

                }
            }
        });
}

function saveHu(req, res) {
    var hu = new Hu();

    var params = req.body;
    hu.numero = params.numero;
    hu.nombre = params.nombre;
    hu.descripcion = params.descripcion;
    hu.tipo = params.tipo;
    hu.tareas.a1 = params.tareas.a1;
    hu.tareas.a2 = params.tareas.a2;
    hu.tareas.a3 = params.tareas.a3;
    hu.tareas.finalizado = params.tareas.finalizado;
    hu.iteracion = params.iteracion;
    hu.posX = params.posX;
    hu.posY = params.posY;
    hu.proyecto = params.proyectoID;

    hu.save((err, huStored) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!huStored) {
                res.status(404).send({ message: "No se ha guardado la Historia de Usuario" });
            } else {
                res.status(200).send(huStored);
            }
        }
    });
}

function updateHu(req, res) {
    var huId = req.params.id;
    var update = req.body;

    Hu.findByIdAndUpdate(huId, update, (err, huUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!huUpdated) {
                res.status(404).send({ message: "No se ha actualizado la Historia de Usuario" });
            } else {
                res.status(200).send(huUpdated);
            }
        }
    });
}

function deleteHu(req, res) {
    var proyectoId = req.params.proyecto;
    var huId = req.params.id;

    Hu.find({ proyecto: proyectoId, padres: huId }, ('_id', 'tipo'), function (err, hijos) {
        if (hijos.length === 0) {
            Hu.findByIdAndRemove(huId, (err, huRemoved) => {
                if (err) {
                    res.status(500).send({ message: "Error al borrar la Historia de Usuario" });
                } else {
                    if (!huRemoved) {
                        res.status(404).send({ message: "No se ha podido borrar la Historia de Usuario" });
                    } else {
                        res.status(200).send(huRemoved);
                    }
                }
            });
        } else {
            res.status(200).send(undefined);
        }
    });


}

module.exports = {
    getHu,
    getHijos,
    getDescendientes,
    getAscendientes,
    getPadres,
    saveHu,
    getHus,
    getHusIter,
    updateHu,
    deleteHu
};