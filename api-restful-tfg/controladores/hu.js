'use strict';

// var Iteracion = require('../modelos/iteracion');
var Hu = require('../modelos/hu');
var Proyecto = require('../modelos/proyecto');

function getHu(req, res) {
    var huId = req.params.id;

    Hu.findById(huId, (err, hu) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!hu) {
                res.status(404).send({message: "No existe la Historia de Usuario"});
            } else {
                Proyecto.populate(hu, {path: 'proyecto'}, (err, hu) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send({hu});
                    }
                });
            }
        }
    });
}

function getHus(req, res) {
    var proyectoId = req.params.proyecto;

    if(!proyectoId) {
        //Sacar todas las hu de la base de datos
        var find = Hu.find({}).sort('nombre');
    } else {
        //Sacar las hu asociadas al proyecto
        var find = Hu.find({proyecto: proyectoId}).sort('nombre');
    }

    find.exec((err, hus) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!hus) {
                res.status(404).send({message: "No hay Historias de Usuario en este proyecto"});
            } else {
                Proyecto.populate(hus, {path: 'proyecto'}, (err, hus) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send({hus});
                    }
                });
            }
        }
    });
}

function getHijosTipo(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;
    //Sacar los ID de las HU del proyecto que tienen de padre huID
    var find = Hu.find( { proyecto: proyectoId, padres: huID }, ('_id', 'tipo'));

    find.exec((err, hus) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!hus) {
                res.status(404).send({message: "No hay Historias de Usuario en este proyecto"});
            } else {
                Proyecto.populate(hus, {path: 'proyecto'}, (err, hus) => {
                    if(err) {
                        res.status(500).send({message: "Error en la petición"});
                    } else {
                        res.status(200).send({hus});
                    }
                });
            }
        }
    });
}


function getTipoPadres(req, res) {
    var proyectoId = req.params.proyecto;
    var huID = req.params.id;
    //Sacar las HU que son padres de huID
    Hu.
    find( { proyecto: proyectoId, _id: huID }, 'padres').
    populate( 'padres', 'tipo').
    exec((err, hus) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!hus) {
                res.status(404).send({message: "No hay Historias de Usuario en este proyecto"});
            } else {  
                    res.status(200).send({hus});
                   
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
    //hu.tareas.push(params.tareas);
    hu.iteracion = params.iteracion;
    hu.posX = params.posX;
    hu.posY = params.posY;
    //hu.padres.push(params.padres);
    hu.proyecto = params.proyectoID;

    hu.save((err, huStored) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!huStored) {
                res.status(404).send({message: "No se ha guardado la Historia de Usuario"});
            } else {
                res.status(200).send({hu: huStored});
            }
        }
    });
}

function updateHu(req, res) {
    var huId = req.params.id;
    var update = req.body;

    Hu.findByIdAndUpdate(huId, update, (err, huUpdated) => {
        if(err) {
            res.status(500).send({message: "Error en la petición"});
        } else {
            if(!huUpdated) {
                res.status(404).send({message: "No se ha actualizado la Historia de Usuario"});
            } else {
                res.status(200).send({hu: huUpdated});
            }
        }
    });
}

function deleteHu(req, res) {
    var huId = req.params.id;

    Hu.findByIdAndRemove(huId, (err, huRemoved) => {
        if(err) {
            res.status(500).send({message: "Error al borrar la Historia de Usuario"});
        } else {
            if(!huRemoved) {
                res.status(404).send({message: "No se ha podido borrar la Historia de Usuario"});
            } else {
                res.status(200).send({hu: huRemoved});
            }
        }
    });
}

module.exports = {
    getHu,
    getHijosTipo,
    getTipoPadres,
    saveHu,
    getHus,
    updateHu,
    deleteHu
};