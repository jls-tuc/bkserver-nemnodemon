const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localidadesSchema = {
    nombre: String,
};

module.exports = mongoose.model("Localidades", localidadesSchema);