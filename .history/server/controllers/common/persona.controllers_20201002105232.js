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
        renaper.save()
    }


}



module.exports = { getPersona }