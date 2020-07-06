const express = require('express');
const app = express();
const servicio = require('../../ws/Renaper');
const servrrhh = require('../../ws/wsTrabajo');



app.get('/renaper', async(req, res, next) => {
    console.log("Entra a renaper");
    let persona = {
        documento: '28234579',
        sexo: 'F' //Mayuscula
    }
    let renaper = servicio.getServicioRenaper(persona);
    console.log("Renaperrr: ", renaper);
});

app.get('/rrhh', async(req, res, next) => {
    console.log("Entra rrhh ");
    let persona = {
        documento: '28234579',
        sexo: '|F|' //Mayuscula
    }
    let rrhh = servrrhh.getServicioRRHH(persona);
    console.log("RRHH: ", rrhh);
});

module.exports = app;