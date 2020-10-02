const { response } = require("express");
const Persona = require("../../models/personas");
const servicio = require('../../../ws/Renaper');



const getPersona = async(req, res = response) => {
    let documento = req.body.documento
    let sexo = req.body.sexo
    let persona = {
        documento,
        sexo //Mayuscula
    }
    const personaBd = await Persona.findOne({ "documento": documento })
    if (personaBd === null) {
        let renaper = await servicio.getServicioRenaper(persona)
        res.status(201).json({
            ok: true,
            personaRe: renaper.datos,
        });

    } else {
        res.status(201).json({
            ok: true,
            personaBd
        })
    }
}


const postPersona = async(req, res) => {

    let persona = new Persona(req.body);
    await persona.save((err, personaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear la persona",
                errors: err,
            });
        }
        res.status(201).json({
            ok: true,
            persona: personaGuardada,
        });

    });
};


module.exports = {
    getPersona,
    postPersona
}