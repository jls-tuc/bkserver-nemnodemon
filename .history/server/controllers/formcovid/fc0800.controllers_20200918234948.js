const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Fc0800 = require("../../models/formcovid/fc0800");

const getForm = async (req, res = response) => {
  let query;
  query = Fc0800.find();

  let start;
  let end;

  if (req.body.fechaDesde && req.body.fechaHasta) {
    start = req.body.fechaDesde
      .substring(0, 8)
      .concat(Number(req.body.fechaDesde.substring(8)));
    end = req.body.fechaHasta
      .substring(0, 8)
      .concat(Number(req.body.fechaHasta.substring(8)) + 1);
  }
  /*  if (req.query.fechaDesde && req.query.fechaHasta) {
    query.or([{ fecha: { $gte: new Date(start), $lt: new Date(end) } }]); */

  if (req.body["tipo_registro"]) {
    query.or([{ tipo_registro: req.body["tipo_registro"] }]);
  }
  if (req.body["localidad"]) {
    query.or([{ "persona.localidad": req.body["localidad"] }]);
  }
  if (req.body["lugar"]) {
    query.and([{ "trabajo.lugar": req.body["lugar"] }]);
  }

  if (req.body.fechaDesde && req.body.fechaHasta) {
    query.and([{ fecha: { $gte: start, $lte: end } }]);
  }
  console.log("Queryyy: ", query._conditions);

  query.exec((err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
  /*  //console.log("fech busqueda", start);
  const query = { fecha: { $gte: new Date(start), $lt: new Date(end) } };

  try {
    const rangoF = await Fc0800.find(query).exec();
    let totalF = rangoF.length;
    return res.status(200).json({
      ok: true,
      totalF,
      rangoF,
    });
  } catch (error) {
    // en caso de error en la consulta mostramos el error
    console.log(error);
    return res.status(500).json({
      ok: false,
      error,
    });
  } */
};

const getFormById = async (req, res = response) => {
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

const postForm = async (req, res = response, next) => {
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

const updateForm = async (req, res = response) => {
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

const deleteForm = async (req, res = response) => {
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
