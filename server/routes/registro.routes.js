const express = require('express');
const app = express();
const mdAutenticacion = require('../../config/middlewares/auth');


const Registro = require('../models/registro')

app.get('/', (req, res, next) => {

    Registro.find({}, ) //pido lo que quiero ver
        .exec(
            (err, registros) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los datos registros solicitados',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    registros: registros
                });



            });
});



app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    let body = req.body;
    let registro = new Registro({

        tipo_registro: body.tipo_registro.toLowerCase(),
        estado: body.estado,
        temperatura: temperatura.body.estado,
        persona: body.persona,
        usuario: req.usuario._id,
        edificio: body.edificio
    });
    registro.save((err, registroGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el nuevo registro',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            registro: registroGuardado,

        });
    });

});





module.exports = app;