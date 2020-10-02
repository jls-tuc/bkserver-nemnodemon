const { response } = require('express');

const Usuario = require('../models/usuario');
const Persona = require('../models/personas');
const Edificio = require('../models/edificio');
const Registro = require('../models/registro');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, personas, edificios, registros] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Persona.find({ nombre: regex }),
        Edificio.find({ nombre: regex }),
        Registro.find({ tipo_registro: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        personas,
        edificios,
        registros
    })

}

const getDocumentosColeccion = async(req, res) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'registros':
            data = await Registro.find({ tipo_registro: regex })
                .populate('persona', 'nombre apellido documento img')
                .populate('edificio', 'nombre localidad direccion img')
            break;
        case 'personas':
            console.log(tabla),
                console.log(busqueda),
                data = await Persona.find({ nombre: regex })

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

const dniGet = async(req, res = response) => {
    const dni = req.params.dni;
    console.log(dni)
    try {
        const personaDni = await Persona.findOne({ documento: dni }, 'nombre apellido documento cuil localidad calle numero img fechaNacimiento sexo', function(err, results) {
            if (err) {
                res.status(500).json({
                    ok: false,
                    error: err
                })
            }
            res.status(200).json({
                ok: true,
                results

            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'No existe el  DNI cargado en la base de datos',
            error
        });

    };

}

module.exports = {
    getTodo,
    getDocumentosColeccion,
    dniGet
}