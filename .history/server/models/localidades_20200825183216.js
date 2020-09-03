const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localidadSchema = new Schema({
    nombre: String,
});

module.exports = mongoose.model("Localidad", localidadSchema);