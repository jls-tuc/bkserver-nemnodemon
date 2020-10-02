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
    console.log("doc", doc)
    const personaBd = await Persona.findOne({ "documento": doc }, function(err, dato) {
        if (err) { console.log("Paso1", err) } else if (dato === null) {

            let renaper = servicio.getServicioRenaper(persona)

            res.status(200).json({
                ok: true,
                personaBd: renaper
            })
        }
    })

}



module.exports = { getPersona }