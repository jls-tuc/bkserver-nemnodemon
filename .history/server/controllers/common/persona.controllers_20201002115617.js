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
    let body = req.body;

    let persona = await new Persona({
        nombre: body.nombre.toLowerCase(),
        apellido: body.apellido.toLowerCase(),
        fechaNacimiento: body.fechaNacimiento.toLowerCase(),
        documento: body.documento,
        cuil: body.cuil,
        sexo: body.sexo.toLowerCase(),
        calle: body.calle.toLowerCase(),
        numero: body.numero.toLowerCase(),
        piso: body.piso.toLowerCase(),
        departamento: body.departamento.toLowerCase(),
        cpostal: body.cpostal,
        barrio: body.barrio,
        monoblock: body.monoblock.toLowerCase(),
        zona: body.zona.toLowerCase(),
        localidad: body.localidad.toLowerCase(),
        provincia: body.provincia.toLowerCase(),
        pais: body.pais.toLowerCase(),
        img: body.img,
        origenf: body.origenf,
        usuario: req.usuario._id,
    });
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
        console.log(personaGuardada);
    });
};


module.exports = {
    getPersona,
    postPersona
}