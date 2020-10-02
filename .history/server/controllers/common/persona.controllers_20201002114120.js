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
            personaRe: renaper,
        });

    } else {
        res.status(201).json({
            ok: true,
            personaBd
        })
    }
}


module.exports = { getPersona }