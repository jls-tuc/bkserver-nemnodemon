const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const constantes = require("../../../ws/constantes");
const Schema = mongoose.Schema;

const fc0800Schema = new Schema({
    nroForm: { type: Number, unique: true },
    fecha: { type: Date, default: () => Date.now },
    tipo_registro: {
        type: String,
        requiere: true,
        enum: ["Sintomas", "Sin sintomas"],
    },
    motivo_consulta: {
        type: String,
    },
    persona: {
        nombre: { type: String },
        apellido: { type: String },
        documento: { type: String },
        fechaNacimiento: String,
        sexo: constantes.SEXO,
        telefono: { type: String },
        telefono2: { type: String },
        calle: { type: String },
        departamento: { type: String },
        piso: { type: String },
        numero: { type: String },
        localidad: { type: String },
        provincia: { type: String },
        pais: { type: String },
        img: { type: String },
    },

    fecha_ini_sint: { type: Date, default: () => Date.now },
    sintomas: { type: String },
    antencedentes_p: { type: String },
    enfermedad_pre: { type: String },
    toma_medicamentos: { type: String },
    vivienda_personas: { type: Number },

    trabajo: [{
        lugar: { type: String },
        telefono: { type: String },
        calle: { type: String },
        numero: { type: String },
        localidad: { type: String },
    }, ],

    usuario: String,
}, {
    collection: "fc0800",
    timestamps: true,
});
fc0800Schema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Fc0800", fc0800Schema);