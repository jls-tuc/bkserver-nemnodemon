const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localidadSchema = {
    nombre: String,
};

module.exports = mongoose.model("Localidad", localidadSchema);