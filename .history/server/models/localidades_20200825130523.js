const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
const { schema } = require("./acceso_edificio");
const Schema = mongoose.Schema

const localidadesSchema = ({
    nombre: String,

});
module.exports = mongoose.module('Localidades', localidadesSchema);