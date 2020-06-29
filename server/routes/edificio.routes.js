const express = require('express');
const app = express();
const mdAutenticacion = require('../../config/middlewares/auth');

const Edificio = require('../models/edificio');





app.get('/', (req, res, next) => {

    Edificio.find({}, 'nombre localidad direccion img ') //pido lo que quiero ver
        .exec(
            (err, edificios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando edificio',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    edificios: edificios
                });



            });
});

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Edificio.findById(id, (err, edificio) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Edificio',
                errors: err
            });
        }

        if (!edificio) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El edificio con el id ' + id + ' no existe',
                errors: { message: 'No existe un edificio con ese ID' }
            });
        }
        edificio.nombre = body.nombre;
        edificio.localidad = body.localidad;
        edificio.direccion = body.direccion;
        edificio.usuario = req.usuario._id;

        edificio.save((err, edificioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar edificio',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                edificio: edificioGuardado
            });

        });

    });
});

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    let body = req.body;
    let edificio = new Edificio({
        nombre: body.nombre,
        localidad: body.localidad,
        direccion: body.direccion,
        usuario: req.usuario._id
    });
    edificio.save((err, edificioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear edificio',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            edificio: edificioGuardado,

        });
    });

});
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    Edificio.findByIdAndRemove(id, (err, edificioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar el edificio',
                errors: err
            });
        }
        if (!edificioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un edificio con ese id',
                errors: { message: 'No existe un edificio con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            edificio: edificioBorrado,
            mensaje: 'Se elemino correctamente el ' + Edificio.nombre,

        });
    });
});


module.exports = app;