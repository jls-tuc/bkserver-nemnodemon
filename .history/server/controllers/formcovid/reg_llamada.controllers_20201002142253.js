const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Reg_llamada = require("../../models/formcovid/reg_llamada");



const postForm = async(req, res = response, next) => {
    moment.locale("es");
    req.body.fecha = moment().format("YYYY/MM/DD");
    req.body.reg_llamada[0].nroLlamada = 1
    const newReg = new Reg_llamada(req.body);
    try {
        const regBd = await newReg.save();
        res.status(200).json({
            ok: true,
            regBd
        });
    } catch (err) {
        console.log("Error al guardar registro de llamada", err)
        res.status(400).json({
            ok: false,
            err
        })
    }
};

const updateForm = async(req, res = response) => {
    moment.locale("es");
    req.body.fecha = moment().format("YYYY/MM/DD");

    let ultimoNroRegistro = await Reg_llamada.aggregate([{
                $unwind: "$reg_llamada"
            },
            {
                "$replaceRoot": {
                    "newRoot": "$reg_llamada"
                }
            }
        ])
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    console.log("1", ultimoNroRegistro);
    //console.log("1/2", ultimoNroRegistro[0].nroLlamada);
    if (ultimoNroRegistro.length) {
        req.body.reg_llamada[0].nroLlamada = await getNroRegristro(ultimoNroRegistro[0].nroLlamada);
        console.log("2", req.body.reg_llamada[0].nroLlamada);
    } else {
        req.body.reg_llamada[0].nroLlamada = 1;
    }
    let newRegistro = req.body
    try {
        const registroUpdate = await Reg_llamada.findOneAndUpdate({ _id: req.body.id }, { $push: { reg_llamada: newRegistro } }, {
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

const getRegistros = async(req, res) => {


}

module.exports = {

    postForm,
    updateForm,
    getRegistros

};



/* const postForm = async(req, res = response, next) => {
    moment.locale("es");
    req.body.fecha = moment().format("YYYY/MM/DD");
    //console.log(req.body.fecha);
    //console.log("array", req.body.reg_llamada[0].nroLlamada)
    let ultimoNroRegistro = await Reg_llamada.aggregate([{
                $unwind: "$reg_llamada"
            },
            {
                "$replaceRoot": {
                    "newRoot": "$reg_llamada"
                }
            }
        ])
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    console.log("1", ultimoNroRegistro);
    //console.log("1/2", ultimoNroRegistro[0].nroLlamada);
    if (ultimoNroRegistro.length) {
        req.body.reg_llamada[0].nroLlamada = await getNroRegristro(ultimoNroRegistro[0].nroLlamada);
        console.log("2", req.body.reg_llamada[0].nroLlamada);
    } else {
        req.body.reg_llamada[0].nroLlamada = 1;
    }
    const registro = new Reg_llamada(req.body);
    try {

        const registroDB = await registro.save();

        res.status(400).json({
            ok: true,
            msg: "Datos guardos correctamente",
            reg_0800: registroDB,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al guardar la informacion, verifique los datos",
            error,
        });
    }
}; */