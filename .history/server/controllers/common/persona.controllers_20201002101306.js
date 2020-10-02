const { response } = require("express");
const Persona = require("../../models/personas");
const servicio = require('../../../ws/Renaper');



const getPersona = async(req, res = response) => {
    let doc = req.body.documento
    let sexo = req.body.sexo
    let per = { doc, sexo }
    console.log("doc", doc)
    const personaBd = await Persona.findOne({ "documento": doc }, function(err, persona) {
        if (err) { console.log("Paso1", err) } else if (persona === null) {

            const renaper = servicio.getServicioRenaper(per)

            res.status(200).json({
                ok: true,
                personaBd: renaper
            })
        }
    })

}



module.exports = { getPersona }