const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Fc0800 = require("../../models/formcovid/fc0800");

const getForm = async(req, res = response) => {
    const fechaDesde = req.body.fechaDesde; // ejemplo: '2020/09/18'
    console.log('desde', req.body.fechaDesde)
    const fechaHasta = req.body.fechaHasta;
    console.log('hasta', req.body.fechaHasta)
    const start = fechaDesde.substring(0, 8).concat(Number(fechaDesde.substring(8)) + 1);
    const end = fechaHasta.substring(0, 8).concat(Number(fechaHasta.substring(8)) + 1);
    console.log("fech busqueda", start)
    Fc0800.find({ $and: [{ fecha: { $gte: new Date(start) } }, { fecha: { $lt: new Date(end) } }] }, (err, reg) => {
        let totalreg = reg.length
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                error: err.message
            });
        }
        if (!reg) { // si no se consiguen documentos
            return res.status(400).json({
                message: 'No se ha encontrado actividad en la fecha dada.'
            });
        }
        Fc0800.count({}, (err, total) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el conteo de los datos laborales',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                reg,
                total,
                totalreg
            });
        });
    }, )
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
    // console.log(req.body.fecha);
    let ultimoNroRegistro = await Fc0800.findOne()
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    //  console.log("1", ultimoNroRegistro);
    if (ultimoNroRegistro) {
        req.body.nroForm = await getNroRegristro(ultimoNroRegistro.nroForm);
        //   console.log("2", req.body.nroForm);
    } else {
        req.body.nroForm = 1;
    }
    const registro = new Fc0800(req.body);
    try {
        const registroDB = await registro.save();

        //console.log(registroDB);

        res.status(400).json({
            ok: true,
            msg: "Datos guardos correctamente",
            registro: registroDB,
        });
    } catch (error) {
        console.log('Cargando Form error', error);
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