const { response } = require("express");
const { moment } = require("moment");
const {
    getNroRegristro,
} = require("../controllers/commons/solicitudesNro.controllers");
const Registro = require("../../models/registro");

const getRegistro = async(req, res = response) => {
    try {
        const registros = await Registro.find().populate("usuario", "nombre");

        res.status(200).json({
            ok: true,
            registros,
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            error,
        });
    }
};

const getRegistroById = async(req, res = response) => {
    let id = req.params.id;

    try {
        const registro = await Registro.findById(id)
            .populate("usuario", "nombre")
            .populate("persona", "nombre apellido documento img")
            .populate("edificio", "nombre localidad direccion");

        res.status(200).json({
            ok: true,
            registro,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al realizar la busqueda, verifique el ID",
            error,
        });
    }
};

const crearRegistro = async(req, res = response, next) => {
    let ultimoNroRegistro = await Registro.findOne()
        .sort({ field: "asc", _id: -1 })
        .limit(1);

    if (ultimoNroRegistro) {
        req.body.data.nroRegistro = getNroRegristro(ultimoNroRegistro.nroRegistro);
    } else {
        req.body.data.nroRegistro = 1;
    }
    const registro = new Registro(req.body.data);
    try {
        const registroDB = await registro.save();

        console.log(registroDB);

        res.status(400).json({
            ok: true,
            msg: "Datos guardos correctamente",
            registro: registroDB,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al guardar la informacion, verifique los datos",
            error,
        });
    }
};

const updateRegistro = async(req, res = response) => {
    let id = req.params.id;
    let body = req.body.data;
    try {
        const registroUpdate = await Registro.findOneAndUpdate(id, data, {
            new: true,
        });
        console.log(registroUpdate);
        res.status(200).json({
            ok: true,
            msg: "Datos actualizados correctamente",
            registro: registroUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: "Verificar los datos",
            error,
        });
    }
};

const deleteRegistro = async(req, res = response) => {
    let id = req.params.id;

    try {
        await Registro.findOneAndRemove(id);
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
    getRegistro,
    getRegistroById,
    crearRegistro,
    updateRegistro,
    deleteRegistro,
};