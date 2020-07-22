const { response } = require("express");
const Sector = require("../models/sector_edificio");




const getSector = async(req, res = response) => {

    const sectores = await Sector.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        sectores
    })
}

const getSectorById = async(req, res = response) => {
    const id = req.params.id;
    console.log(id)

    try {
        const sector = await Sector.findById(id)
            .populate('usuario', 'nombre img');
        res.json({
            ok: true,
            sector
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Error la buscar los datos verifique el ID',
            error
        })
    }
}

const crearSector = async(req, res = response) => {
    let body = req.body;
    const sector = new Sector({
        ...req.body,
        usuario: req.usuario._id
    });
    console.log(sector);
    try {
        const accesoDB = await sector.save();
        res.json({
            ok: true,
            msg: 'El sector se creo correctamente',
            sector: accesoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verificar los datos enviados',
            error
        })

    }

}

const modificarSector = async(req, res = response) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const cambioSector = {
            ...req.body,
            usuario: req.usuario._id
        }
        const newSector = await Sector.findByIdAndUpdate(id, cambioSector, { new: true });
        res.json({
            ok: true,
            sector: newSector
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verificar los datos enviados',
            error
        })

    }
}
const borrarSector = async(req, res = response) => {
    const id = req.params.id;
    try {
        await Sector.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Datos borrados correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verificar los datos enviados',
            error
        })

    }
}


module.exports = {
    getSector,
    getSectorById,
    crearSector,
    modificarSector,
    borrarSector
};