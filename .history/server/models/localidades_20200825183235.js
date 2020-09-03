const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localidadesSchema = new Schema({
    nombre: String,
});

module.exports = mongoose.model("Localidades", localidadesSchema);