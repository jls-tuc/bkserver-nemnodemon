const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Reg_llamada = require("../../models/formcovid/reg_llamada");



const postForm = async(req, res = response, next) => {
    moment.locale("es");
    req.body.fecha = moment().format("YYYY/MM/DD");
    //console.log(req.body.fecha);
    let ultimoNroRegistro = await Reg_llamada.findOne({ "llamada": "nroLlamada" })
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    //console.log("1", ultimoNroRegistro);
    if (ultimoNroRegistro) {
        req.body.nroLlamada = await getNroRegristro(ultimoNroRegistro.nroForm);
        //console.log("2", req.body.nroForm);
    } else {
        req.body.nroLlamada = 1;
    }
    const form = new Llamada(req.body);
    try {
        const formDB = await form.save();

        res.status(400).json({
            ok: true,
            msg: "Datos guardos correctamente",
            form0800covid: formDB,
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

const updateForm = async(req, res = response) => {
    let id = req.params.id;
    let body = req.body.data;
    try {
        const registroUpdate = await Llamada.findOneAndUpdate(id, data, {
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

const deleteForm = async(req, res = response) => {
    let id = req.params.id;

    try {
        awaitFc0800.Llamada(id);
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

    postForm,
    updateForm,
    deleteForm,
};