const mongoose = require("mongoose");
const uniqueValidator = require("mongoose");
const Schema = mongoose.Schema;

const reg_llamadaSchema = new Schema({
  fecha: { type: Date, default: () => Date.now },
  llamadas: [
    {
      reg_nro: { type: Number, unique: true },
      tipo_registro: {
        type: String,
        requiere: true,
        // enum: ["Sintomas", "Sin sintomas"],
      },
      motivo_consulta: {
        type: String,
      },
      atencion_domiciliaria: {
        type: Boolean,
        requiere: true,
      },
      cert_aislamiento: {
        type: Boolean,
        requiere: true,
      },
      resultado_hisopado: {
        type: Boolean,
        requiere: true,
      },
      derivacion_107: {
        type: Boolean,
        requiere: true,
      },
      mov_propia: {
        type: Boolean,
        requiere: true,
      },
      criterio_hisopado: {
        type: String,
        requiere: true,
      },
      realizo_hisopado: {
        type: String,
        requiere: true,
      },
      fecha_ini_sint: { type: Date, default: Date.now },
      sintomas: { type: String },
      antencedentes_p: { type: String },
      enfermedad_pre: { type: String },
      toma_medicamentos: { type: String },
      vivienda_personas: { type: Number },
      lugar_hisopado: { type: String },
      fecha_hisopado: { type: Date, default: Date.now },
    },
  ],
});

reg_llamadaSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});
module.exports = mongoose.model("Reg_llamadas", reg_llamadaSchema);
