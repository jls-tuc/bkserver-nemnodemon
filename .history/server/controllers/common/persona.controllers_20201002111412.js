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
    const personaBd = await Persona.findOne({ "documento": documento }, function(err, dato) {
        if (err) { console.log("Paso1", err) } else {
            res.status(200).json({
                personaBd: dato,
            });
        }
    })
    if (personaBd === null) {

        let renaper = await servicio.getServicioRenaper(persona)
        console.log("DAtos========", renaper.datos.nombres)
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
            localidad: renaper.datos.localidad.toLowerCase(),
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
                persona: personaGuardada,
            });
            console.log(personaGuardada);
        });


    }
}


module.exports = { getPersona }