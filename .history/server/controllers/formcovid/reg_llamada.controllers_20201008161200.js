const { response } = require("express");
const moment = require("moment");
const getNroRegristro = require("../common/solicitudesNro.controllers");
const Reg_llamada = require("../../models/formcovid/reg_llamada");

const postForm = async (req, res = response, next) => {
  moment.locale("es");
  req.body.fecha = moment().format("YYYY/MM/DD");
  req.body.reg_llamada[0].fecha = moment().format("YYYY/MM/DD");
  let ultimoNroRegistro = await Reg_llamada.findOne()
    .sort({ field: "asc", _id: -1 })
    .limit(1);
  console.log(ultimoNroRegistro);
  if (ultimoNroRegistro) {
    req.body.nroForm = await getNroRegristro(ultimoNroRegistro.nroForm);
    console.log("2", req.body.nroForm);
    req.body.reg_llamada[0].nroForm = 1;
  } else {
    req.body.nroForm = 1;
    req.body.reg_llamada[0].nroForm = 1;
  }
  const newReg = new Reg_llamada(req.body);
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
  console.log(req.params.id);
  moment.locale("es");
  req.body.fecha = moment().format("YYYY/MM/DD");
  let ultimoNroRegistro = await Reg_llamada.aggregate([
    {
      $unwind: "$reg_llamada",
    },
    {
      $replaceRoot: {
        newRoot: "$reg_llamada",
      },
    },
  ])
    .sort({ field: "asc", _id: -1 })
    .limit(1);
  //console.log("1", ultimoNroRegistro);
  //console.log("1/2", ultimoNroRegistro[0].nroLlamada);
  if (ultimoNroRegistro.length) {
    req.body.nroForm = await getNroRegristro(ultimoNroRegistro[0].nroForm);
    console.log("2", req.body.nroForm);
  } else {
    req.body.reg_llamada[0].nroForm = 1;
  }
  let newRegistro = req.body;
  //console.log("antes de guardar", newRegistro)
  try {
    await Reg_llamada.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reg_llamada: newRegistro } },
      {
        new: true,
      }
    );
    //  console.log(registroUpdate);
    res.status(200).json({
      ok: true,
      msg: "Datos actualizados correctamente",
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
      Reg_llamada.find({}).skip(desde).limit(hasta),
      Reg_llamada.countDocuments(),
    ]);

    res.status(200).json({
      ok: true,
      total,
      registros,
    });
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

module.exports = {
  postForm,
  updateForm,
  getRegistros,
  getOneReg,
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
<<<<<<< HEAD
}; */
=======
}; */
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261
