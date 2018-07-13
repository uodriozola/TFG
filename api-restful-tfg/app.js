'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Carga de rutas
var proyectoRutas = require('./rutas/proyecto');
var huRutas = require('./rutas/hu');
var iteracionRutas = require('./rutas/iteracion');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurar las cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Cualquiera puede hacer peticiones a nuestro API REST
    res.header('Access-Control-Allow-Headers', 'X-AIP-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next(); //Para que salga de la función
});

//Configurar las rutas base
app.use('/api', proyectoRutas);
app.use('/api', huRutas);
app.use('/api', iteracionRutas);

module.exports = app;