const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Fc0800 = require("../../models/formcovid/fc0800");
const { ISO_8601, now } = require("moment");

const getForm = async(req, res = response) => {
    moment.locale("es");

    let query;
    query = Fc0800.find();

    let desde;
    let hasta;

    console.log(" start: ", start);
    console.log(" end: ", end);
    if (req.query.fechaDesde && req.query.fechaHasta) {
        desde = moment(new Date(req.query.fechaDesde))
            .utc()
            .startOf("day")
            .toDate();
        hasta = moment(new Date(req.query.fechaHasta)).utc().endOf("day").toDate();
    }
    console.log("Fe3chasss start: ", start);
    console.log("Fe3chasss end: ", end);

    if (req.query.fechaDesde && req.query.fechaHasta) {
        query.and([{ fecha: { $gte: desde, $lte: hasta } }]);
    }

    if (req.query.usuario) {
        query.or([{ usuario: req.query.usuario }]);
    }
    if (req.quer["tipo_registro.enum"])
        if (req.query["localidad"]) {
            query.or([{ "persona.localidad": req.query["localidad"] }]);
        }
    console.log("Queryyy: ", query._conditions);

    query.exec((err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
};

const getFormById = async(req, res = response) => {
    let id = req.params.id;

    try {
        const registro = await Fc0800.findById(id)
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

const postForm = async(req, res = response, next) => {
    moment.locale("es");
    req.body.fecha = moment().format("YYYY/MM/DD");
    console.log(req.body.fecha);
    let ultimoNroRegistro = await Fc0800.findOne()
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    console.log("1", ultimoNroRegistro);
    if (ultimoNroRegistro) {
        req.body.nroForm = await getNroRegristro(ultimoNroRegistro.nroForm);
        console.log("2", req.body.nroForm);
    } else {
        req.body.nroForm = 1;
    }

    const form = new Fc0800(req.body);
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
        const registroUpdate = await Fc0800.findOneAndUpdate(id, data, {
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
        awaitFc0800.findOneAndRemove(id);
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
    getForm,
    getFormById,
    postForm,
    updateForm,
    deleteForm,
};