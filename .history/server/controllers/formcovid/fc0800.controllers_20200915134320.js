const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Fc0800 = require("../../models/formcovid/fc0800");

const getForm = async(req, res = response) => {
    moment.locale("es");

    let query;
    query = Fc0800.find();

    if (req.query.fechaDesde && req.query.fechaHasta) {
        start = moment(new Date(req.query.fechaDesde))
            .utc()
            .startOf("day")
            .toDate();
        end = moment(new Date(req.query.fechaHasta)).utc().endOf("day").toDate();
        let start;
        let end;
    }
    console.log("Fe3chasss start: ", start);
    console.log("Fe3chasss end: ", end);

    if (req.query.creador) {
        query.or([{ creador: req.query.creador }]);
    }
    if (req.query["solicitudAsignada.usuario"]) {
        query.or([
            { "solicitudAsignada.usuario": req.query["solicitudAsignada.usuario"] },
        ]);
    }

    if (req.query["solicitudAsignada.perfil"]) {
        query.or([
            { "solicitudAsignada.perfil": req.query["solicitudAsignada.perfil"] },
        ]);
    }

    if (req.query["procedencia"]) {
        query.and([{ procedencia: req.query["procedencia"] }]);
    }

    if (req.query.fechaDesde && req.query.fechaHasta) {
        query.and([{ fecha: { $gte: start, $lte: end } }]);
    }

    // TODO: guardar en la BD la localidad sin caracteres raros
    if (req.query["localidad"]) {
        query.and([{ "asistido.localidad": req.query["localidad"] }]);
    }

    if (req.query["asistencia"]) {
        query.and([{ "asistencia.solicitaAsistencia": req.query["asistencia"] }]);
    }

    if (req.query["gradoUrgencia"]) {
        query.and([{ "asistencia.gradoUrgencia": req.query["gradoUrgencia"] }]);
    }

    if (req.query["asignado"]) {
        query.and([{ "solicitudAsignada.nombreCompleto": req.query["asignado"] }]);
    }
    console.log("Queryyy: ", query._conditions);
    query.exec((err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    });

    try {
        const registros = await Fc0800.find().populate("usuario", "nombre");

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
    let ultimoNroRegistro = await Fc0800.findOne()
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    console.log("1", ultimoNroRegistro);
    if (ultimoNroRegistro) {
        req.body.nroRegistro = await getNroRegristro(ultimoNroRegistro.nroRegistro);
        console.log("2", req.body.nroRegistro);
    } else {
        req.body.nroRegistro = 1;
    }
    const registro = new Fc0800(req.body);
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