'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
require('./passport-config');
var expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
var cors = require('cors');

var app = express();

//Carga de rutas
var proyectoRutas = require('./rutas/proyecto');
var huRutas = require('./rutas/hu');
var iteracionRutas = require('./rutas/iteracion');
var usuarioRutas = require('./rutas/usuario');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurar las cabeceras
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));

// Configuramos las cookies de sesión
app.use(expressSession({
    name: 'miNombre.sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Inicializamos Passport
app.use(passport.initialize());
app.use(passport.session());

//Configurar las rutas base
app.use('/api', proyectoRutas);
app.use('/api', huRutas);
app.use('/api', iteracionRutas);
app.use('/api', usuarioRutas);

module.exports = app;