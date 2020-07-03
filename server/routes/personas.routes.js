const express = require('express');
const app = express();
const mdAutenticacion = require('../../config/middlewares/auth');

const Persona = require('../models/personas');


app.get('/', (req, res, next) => {

    let desde = req.query.desde || 0; //variable que espera un valor para paginar
    desde = Number(desde); //fuerzo que sea numero

    Persona.find({}, 'nombre apellido documento localidad direccion img ') //pido lo que quiero ver
        .skip(desde) //salta el valor desde (muestra el valor desde ej 10 muestra desde el 11)
        .limit(10)
        .exec(
            (err, personas) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar la persona',
                        errors: err
                    });
                }
                Persona.count({}, (err, conteo) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al realizar el conteo',
                            errors: err
                        });
                    }
                    res.status(200).json({
                        ok: true,
                        personas: personas,
                        total: conteo
                    });

                })




            });
});

app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    let body = req.body;
    ``
    let persona = new Persona({

        nombre: body.nombre.toLowerCase(),
        apellido: body.apellido.toLowerCase(),
        fechaNacimiento: body.fechaNacimiento.toLowerCase(),
        documento: body.documento.toLowerCase(),
        cuil: body.cuil.toLowerCase(),
        sexo: body.sexo.toLowerCase(),
        calle: body.calle.toLowerCase(),
        numero: body.numero.toLowerCase(),
        piso: body.piso.toLowerCase(),
        departamento: body.departamento.toLowerCase(),
        cpostal: body.cpostal.toLowerCase(),
        barrio: body.barrio.toLowerCase(),
        monoblock: body.monoblock.toLowerCase(),
        zona: body.zona.toLowerCase(),
        localidad: body.localidad.toLowerCase(),
        provincia: body.provincia.toLowerCase(),
        pais: body.pais.toLowerCase(),
        foto: body.foto,
        origenf: body.origenf,
        usuario: req.usuario._id
    });
    persona.save((err, personaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la persona',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            persona: personaGuardada,

        });
    });

});

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Persona.findById(id, (err, persona) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la persona solicitada',
                errors: err
            });
        }

        if (!persona) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La persona con el id ' + id + ' no existe',
                errors: { message: 'No existe una persona con ese ID' }
            });
        }
        persona.nombre = body.nombre.toLowerCase(),
            persona.apellido = body.apellido.toLowerCase(),
            persona.fechaNacimiento = body.fechaNacimiento.toLowerCase(),
            persona.documento = body.documento.toLowerCase(),
            persona.cuil = body.cuil.toLowerCase(),
            persona.sexo = body.sexo.toLowerCase(),
            persona.calle = body.calle.toLowerCase(),
            persona.numero = body.numero.toLowerCase(),
            persona.piso = body.piso.toLowerCase(),
            persona.departamento = body.departamento.toLowerCase(),
            persona.cpostal = body.cpostal.toLowerCase(),
            persona.barrio = body.barrio.toLowerCase(),
            persona.monoblock = body.monoblock.toLowerCase(),
            persona.zona = body.zona.toLowerCase(),
            persona.localidad = body.localidad.toLowerCase(),
            persona.provincia = body.provincia.toLowerCase(),
            persona.pais = body.pais.toLowerCase(),
            persona.foto = body.foto,
            persona.origenf = body.origenf,
            persona.usuario = req.usuario._id

        persona.save((err, personaGuardada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la persona',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                persona: personaGuardada
            });

        });

    });
});
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    Persona.findByIdAndRemove(id, (err, personaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar la persona',
                errors: err
            });
        }
        if (!personaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una persona con ese id',
                errors: { message: 'No existe una persona con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            persona: personaBorrada,
            mensaje: 'Se elemino correctamente el dato solicitado',

        });
    });
});


module.exports = app;