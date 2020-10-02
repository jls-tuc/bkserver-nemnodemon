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
        console.log("DAtos========", renaper.datos)
        let perRenaper = new Persona({
            nombre: renaper.nombre.toLowerCase(),
            apellido: renaper.apellido.toLowerCase(),
            fechaNacimiento: renaper.fechaNacimiento.toLowerCase(),
            documento: renaper.documento,
            cuil: renaper.cuil,
            sexo: renaper.sexo.toLowerCase(),
            calle: renaper.calle.toLowerCase(),
            numero: renaper.numero.toLowerCase(),
            piso: renaper.piso.toLowerCase(),
            departamento: renaper.departamento.toLowerCase(),
            cpostal: renaper.cpostal,
            barrio: renaper.barrio,
            monoblock: renaper.monoblock.toLowerCase(),
            zona: renaper.zona.toLowerCase(),
            localidad: renaper.localidad.toLowerCase(),
            provincia: renaper.provincia.toLowerCase(),
            pais: renaper.pais.toLowerCase(),
            img: renaper.img,
            origenf: renaper.origenf,
            usuario: renaper.usuario._id,
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