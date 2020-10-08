const { response } = require("express");
const Persona = require("../../models/personas");
<<<<<<< HEAD
const servicio = require("../../../ws/Renaper");

const getPersona = async (req, res = response) => {
  let documento = req.query.documento;
  let sexo = req.query.sexo;
  let persona = {
    documento,
    sexo, //Mayuscula
  };
  console.log(persona);
  const personaBd = await Persona.findOne({ documento: documento });
  if (personaBd === null) {
    let renaper = await servicio.getServicioRenaper(persona);
    const { datos } = renaper;
    if (datos.ID_TRAMITE_PRINCIPAL !== 0) {
      let data = Object.assign(datos, persona);
      let consultaRen = new Persona(data);
      await consultaRen.save((err, consultaRen) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            mensaje: "Error al crear la persona",
            errors: err,
          });
        }
        res.status(201).json({
          ok: true,
          datos: consultaRen,
        });
      });
    } else {
      res.status(200).json({
        ok: false,
        datos: datos,
      });
    }
  } else {
    res.status(201).json({
      ok: true,
      datos: personaBd,
    });
  }
};

const postPersona = async (req, res) => {
  let persona = new Persona(req.body);
  await persona.save((err, personaGuardada) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: "Error al crear la persona",
        errors: err,
      });
    }
    res.status(201).json({
      ok: true,
      persona: personaGuardada,
    });
  });
};

const updatePersona = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  // console.log(req.params.id);
  const newpersona = await Persona.FindAndModify(id, body, { new: true });
  res.status(200).json({
    ok: true,
    update: newpersona,
  });
};

module.exports = {
  getPersona,
  postPersona,
  updatePersona,
};
=======
const servicio = require('../../../ws/Renaper');



const getPersona = async(req, res = response) => {
    let documento = req.body.documento
    let sexo = req.body.sexo
    let persona = {
        documento,
        sexo //Mayuscula
    }
    const personaBd = await Persona.findOne({ "documento": documento })
    if (personaBd === null) {
        let renaper = await servicio.getServicioRenaper(persona)
        res.status(201).json({
            ok: true,
            personaRe: renaper.datos,
        });

    } else {
        res.status(201).json({
            ok: true,
            personaBd
        })
    }
}

const postPersona = async(req, res) => {

    let persona = new Persona(req.body);
    await persona.save((err, personaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear la persona",
                errors: err,
            });
        }
        res.status(201).json({
            ok: true,
            persona: personaGuardada,
        });

    });
};

const updatePersona = async(req, res) => {
    let id = req.params.id;
    let body = req.body;
    // console.log(req.params.id);
    const newpersona = await Persona.FindAndModify(id, body, { new: true, });
    res.status(200).json({
        ok: true,
        update: newpersona
    })
}


module.exports = {
    getPersona,
    postPersona,
    updatePersona
}
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261
