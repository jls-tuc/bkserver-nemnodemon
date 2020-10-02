const { response } = require("express");
const Persona = require("../../models/personas");
const servicio = require('../../../ws/Renaper');



const getPersona = async(req, res = response) => {
    let doc = req.query.documento
    let sexo = req.query.sexo

    const personaBd = await Persona.findOne({ "documento": doc }, function(err, persona) {
        if (err) { console.log("Paso1", err) } else {
            console.log("persona", persona.nombre)
        }
    })

}



module.exports = { getPersona }