const { response } = require("express");
const Acceso = require("../../models/acceso_edificio");

const getAcceso = async(req, res = response) => {
    const accesos = await Acceso.find().populate("usuario", "nombre img");

    res.json({
        ok: true,
        accesos,
    });
};

const getAccesoById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const acceso = await Acceso.findById(id).populate("usuario", "nombre img");
        res.json({
            ok: true,
            acceso,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Error la buscar los datos verifique el ID",
            error,
        });
    }
};

const crearAcceso = async(req, res = response) => {
    let body = req.body;
    const acceso = new Acceso({
        nombre: body.nombre,
        direccion: body.direccion,
        usuario: req.usuario._id,
    });
    console.log(acceso);
    try {
        const accesoDB = await acceso.save();
        res.json({
            ok: true,
            msg: "El acceso se creo correctamente",
            acceso: accesoDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Verificar los datos enviados",
            error,
        });
    }
};

const modificarAcceso = async(req, res = response) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const cambioAcceso = {
            ...req.body,
            usuario: req.usuario._id,
        };
        const newAcceso = await Acceso.findByIdAndUpdate(id, cambioAcceso, {
            new: true,
        });
        res.json({
            ok: true,
            acceso: newAcceso,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Verificar los datos enviados",
            error,
        });
    }
};
const borrarAcceso = async(req, res = response) => {
    const id = req.params.id;
    try {
        await Acceso.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Datos borrados correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Verificar los datos enviados",
            error,
        });
    }
};

module.exports = {
    getAcceso,
    getAccesoById,
    crearAcceso,
    modificarAcceso,
    borrarAcceso,
};