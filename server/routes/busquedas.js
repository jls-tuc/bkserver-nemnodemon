const { response } = require('express');

const Usuario = require('../models/usuario');
const Persona = require('../models/personas');
const Edificio = require('../models/edificio');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, personas, edificios] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Persona.find({ nombre: regex }),
        Edificio.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        personas,
        edificios
    })

}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'personas':
            data = await Persona.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('edificio', 'nombre img');
            break;

        case 'edificios':
            data = await Edificio.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/personas/edificios'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}