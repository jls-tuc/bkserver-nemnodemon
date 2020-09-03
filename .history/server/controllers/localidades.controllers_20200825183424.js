const { response } = require("express");
const { Localidades } = require("../models/localidades");

const getLocalidades = async(req, res = response) => {
    const localidades = await Localidades.find();
    res.json({
        ok: true,
        localidades,
    });
};

module.exports = { getLocalidades };