const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const orderArray = require("../../../config/helpers/sort");
const Reg_llamada = require("../../models/formcovid/reg_llamada");

const postForm = async (req, res = response, next) => {
  console.log("form entrada ", req.body);
  moment.locale("es");
  req.body.fecha = moment().format("YYYY/MM/DD");
  req.body.llamada.fecha = moment().format("YYYY/MM/DD");
  let ultimoNroRegistro = await Reg_llamada.findOne()
    .sort({ field: "asc", _id: -1 })
    .limit(1);
  //console.log(ultimoNroRegistro);
  if (ultimoNroRegistro) {
    req.body.nroForm = await getNroRegristro(ultimoNroRegistro.nroForm);
    //console.log("2", req.body.nroForm);
    // console.log("2", req.body.llamada.nroForm);
    req.body.llamada.nroForm = 1;
    // console.log("2/1", req.body.llamada.nroForm);
  } else {
    req.body.nroForm = 1;
    req.body.llamada.nroForm = 1;
  }
  const newReg = new Reg_llamada(req.body);
  console.log("NewReg", newReg);
  try {
    const regBd = await newReg.save();
    res.status(200).json({
      ok: true,
      regBd,
    });
  } catch (err) {
    console.log("Error al guardar registro de llamada", err);
    res.status(400).json({
      ok: false,
      err,
    });
  }
};

const updateForm = async (req, res = response) => {
  // console.log(req.params.id);
  //console.log("ingresa Reg nuevo", req.body);
  moment.locale("es");
  req.body.fecha = moment().format("YYYY/MM/DD");

  let registro = await Reg_llamada.findOne({
    _id: req.params.id,
  }).lean();
  let ultimoNroRegistro = registro.llamada;
  await orderArray(ultimoNroRegistro);
  //console.log("1", ultimoNroRegistro);
  //console.log("1/2", ultimoNroRegistro[0].nroForm);
  if (ultimoNroRegistro.length) {
    req.body.nroForm = await getNroRegristro(ultimoNroRegistro[0].nroForm);
    // console.log("2", req.body.nroForm);
  } else {
    req.body.nroForm = 1;
  }
  let newRegistro = req.body;
  //console.log("antes de guardar", newRegistro);
  try {
    await Reg_llamada.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { llamada: newRegistro } },
      {
        new: true,
      }
    );
    //  console.log(registroUpdate);
    res.status(200).json({
      ok: true,
      msg: "Registro creado correctamente!",
      registro: newRegistro,
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

const getRegistros = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const hasta = Number(req.query.hasta) || 10;
  //console.log("desde", desde);
  //console.log("hasta", hasta);
  try {
    const [registros, total] = await Promise.all([
      Reg_llamada.find({}).lean().skip(desde).limit(hasta), //cuano el array es muy grande es necesario utilizar la propiedad .lean() dentro del find

      Reg_llamada.countDocuments(),
    ]);
    // console.log("Registros1", registros);
    res.status(200).json({
      ok: true,
      total,
      registros,
    });
    //console.log(registros);
  } catch (error) {
    res.status(404).json({
      ok: false,
      error,
    });
  }
};

const getOneReg = async (req, res) => {
  const doc = req.query.doc;
  // console.log(doc);
  try {
    const result = await Reg_llamada.findOne({ "persona.documento": doc });
    //console.log(result);
    if (result === null) {
      res.status(200).json({
        ok: false,
      });
    } else {
      res.status(200).json({
        ok: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "MMMM no funca Get One doc Registros",
      err,
    });
  }
};

const queryForm = async (req, res = response) => {
  console.log(req.body.fechaDesde);
  let query;
  console.log("consulta", query);
  query = Reg_llamada.find().lean();

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

  if (req.body.fechaDesde && req.body.fechaHasta) {
    query.and([{ fecha: { $gte: new Date(start), $lt: new Date(end) } }]);
  }
  if (req.body["localidad"]) {
    query.or([{ "persona.localidad": req.body["localidad"] }]);
  }
  if (req.body["usuario"]) {
    query.and([{ usuario: req.body.usuario }]);
  }

  query.exec((err, data) => {
    if (err) {
      return next(err);
    }
    totalRes = data.length;
    res.status(200).json({
      ok: true,
      totalRes,
      data,
    });
  });
};

module.exports = {
  postForm,
  updateForm,
  getRegistros,
  getOneReg,
  queryForm,
};
