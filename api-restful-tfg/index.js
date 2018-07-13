'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3700;

mongoose.connect('mongodb://localhost:27017/tfg', (err, res) =>{
    if (err) {
        throw err;
    } else {
        console.log("Base de datos funcionando correctamente");
    
        app.listen(port, () => {
            console.log("API REStful escuchando");
        });
    }
});