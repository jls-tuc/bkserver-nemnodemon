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

const updatePersona = async(req, res) => {
    let id = req.params.id;
    let body = req.body;
    // console.log(req.params.id);
    const newpersona = await Persona.FindAndModify(id, body, { new: true, });
    res.status(200).json({
        ok: true,
        update: newpersona
    })
}


module.exports = {
    getPersona,
    postPersona,
    updatePersona
}