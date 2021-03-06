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
    console.log("doc", documento)
    const personaBd = await Persona.findOne({ "documento": documento })
    if (personaBd === null) {
        let renaper = await servicio.getServicioRenaper(persona)
            //console.log("DAtos========", renaper.datos.nombres)
        let perRenaper = new Persona({
            nombre: renaper.datos.nombres.toLowerCase(),
            apellido: renaper.datos.apellido.toLowerCase(),
            fechaNacimiento: renaper.datos.fechaNacimiento.toLowerCase(),
            documento: documento,
            cuil: renaper.cuil,
            sexo: sexo.toLowerCase(),
            calle: renaper.datos.calle.toLowerCase(),
            numero: renaper.datos.numero.toLowerCase(),
            piso: renaper.datos.piso.toLowerCase(),
            departamento: renaper.datos.departamento.toLowerCase(),
            cpostal: renaper.datos.cpostal,
            barrio: renaper.datos.barrio,
            monoblock: renaper.datos.monoblock.toLowerCase(),
            zona: renaper.datos.municipio.toLowerCase(),
            localidad: renaper.datos.ciudad.toLowerCase(),
            provincia: renaper.datos.provincia.toLowerCase(),
            pais: renaper.datos.pais.toLowerCase(),
            img: renaper.datos.img,
            origenf: renaper.datos.origenf,

        });
        perRenaper.save((err, personaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al crear la persona",
                    errors: err,
                });
            }
            res.status(201).json({
                ok: true,
                personaRe: personaGuardada,
            });
            //  console.log(personaGuardada);
        });


    }
    res.status(201).json({
        personaBd
    })
}


module.exports = { getPersona }