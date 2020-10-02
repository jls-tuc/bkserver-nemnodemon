const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const respSimple = {
  values: ["si", "no"],
  message: "{VALUE} no es una resp permitida",
};
const respTriple = {
  values: ["si", "no", " no se"],
  message: "{VALUE} no es una resp permitida",
};

const fc0800Schema = new Schema(
  {
    nroForm: { type: Number, unique: true },
    fecha: { type: Date, default: () => Date.now },
    tipo_registro: {
      type: String,
      requiere: true,
      // enum: ["Sintomas", "Sin sintomas"],
    },
    motivo_consulta: {
      type: String,
    },
    atencion_domiciliaria: {
      type: String,
      requiere: true,
    },
    cert_aislamiento: {
      type: String,
      requiere: true,
    },
    resultado_hisopado: {
      type: String,
      requiere: true,
    },
    derivacion_107: {
      type: String,
      requiere: true,
    },
    mov_propia: {
      type: String,
      requiere: true,
    },
    obs_atencion_domiciliaria: {
      type: String,
      requiere: true,
    },
    obs_cert_aislamiento: {
      type: String,
      requiere: true,
    },
    obs_resultado_hisopado: {
      type: String,
      requiere: true,
    },
    obs_derivacion_107: {
      type: String,
      requiere: true,
    },
    obs_mov_propia: {
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
    persona: {
      nombre: { type: String },
      apellido: { type: String },
      documento: { type: String },
      fechaNacimiento: String,
      sexo: { type: String }, //constantes.SEXO,
      telefono: { type: String },
      telefono2: { type: String },
      edad: { type: String },
      calle: { type: String },
      cpostal: { type: String },
      departamento: { type: String },
      piso: { type: String },
      numero: { type: String },
      localidad: { type: String },
      provincia: { type: String },
      pais: { type: String },
      img: { type: String },
    },

    trabajo: {
      lugar: { type: String },
      telefonol: { type: String },
      callel: { type: String },
      numerol: { type: String },
      localidadl: { type: String },
    },

    cierre_contacto: { type: String },
    usuario: String,
  },
  {
    collection: "fc0800",
    timestamps: true,
  }
);
fc0800Schema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Fc0800", fc0800Schema);
