const express = require('express');
const app = express();
const mdAutenticacion = require('../../config/middlewares/auth');


const Laboral = require('../models/laboral')

app.get('/', (req, res, next) => {

    Laboral.find({}, ) //pido lo que quiero ver
        .exec(
            (err, laborales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando los datos laborales solicitados',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    laborales: laborales
                });



            });
});



app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    let body = req.body;
    let laboral = new Laboral({
        dependencia: body.dependencia.toLowerCase(),
        n_empleado: body.n_empleado,
        presta_servicio: body.presta_servicio.toLowerCase(),
        telefono_empleador: body.telefono_empleador,
        persona: body.persona,
        usuario: req.usuario._id
    });
    laboral.save((err, laboralGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el nuevo registro',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            laboral: laboralGuardado,

        });
    });

});
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Laboral.findById(id, (err, laboral) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el registro',
                errors: err
            });
        }

        if (!laboral) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El registro con el id ' + id + ' no existe',
                errors: { message: 'No existe un registro con ese ID' }
            });
        }
        laboral.dependencia = body.dependencia.toLowerCase(),
            laboral.n_empleado = body.n_empleado,
            laboral.presta_servicio = body.presta_servicio.toLowerCase(),
            laboral.telefono_empleador = body.telefono_empleador,
            laboral.persona = body.persona,
            laboral.usuario = req.usuario._id

        laboral.save((err, laboralGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar registro',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                laboral: laboralGuardado
            });

        });

    });
});

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    Laboral.findByIdAndRemove(id, (err, laboralBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar el registro',
                errors: err
            });
        }
        if (!laboralBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un registro con ese id',
                errors: { message: 'No existe un registro con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            laboral: laboralBorrado,
            mensaje: 'Se elemino correctamente el registro solicitado' + id,

        });
    });
});


module.exports = app;