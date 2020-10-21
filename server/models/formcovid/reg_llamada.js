const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const reg_llamadaSchema = new Schema(
  {
    fecha: { type: Date, default: () => Date.now },
    nroForm: { type: Number, unique: true },
    llamada: [
      {
        nroForm: { type: Number },
        fecha: { type: Date, default: () => Date.now },
        motivo: { type: String },
        sintomas: { type: String },
        fec_sintomas: { type: String },
        sin_actuales: { type: String },
        con_caso_sos: { type: String },
        obs_contacto: { type: String },
        obra_social: { type: String },
        enf_actual: { type: String },
        obs_enfermedad: { type: String },
        tratamiento: { type: String },
        convivientes: { type: String },
        cant_convivientes: { type: String },
        obs_convivientes: { type: String },
        sit_social: { type: String },
        intervencion: { type: String },
        obs_intervencion: { type: String },
        cri_hisopado: { type: String },
        com_hisopado: { type: String },
        mov_propia: { type: String },
        der_enfermeria: { type: String },
        dis_contacto: { type: String },
        sol_hisopado: { type: String },
        lug_hisopado: { type: String },
        fec_hisopado: { type: String },
        req_extender: { type: String },
        cer_5dias: { type: String },
        cer_contacto: { type: String },
        tip_contacto: { type: String },
        obs_tip_contacto: { type: String },
        cas_positivo: { type: String },
        dat_positivo: { type: String },
        otro_certificado: { type: String },
        req_seguimiento: { type: String },
        seg_domiciliario: { type: String },
        laboratorio: { type: String },
        whatsapp: { type: String },
        det_requerimiento: { type: String },
        fec_salud: { type: String },
        cierre_contacto: { type: String },
        usuario: { type: String },
      },
    ],
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

    trabajo: [
      {
        lugar: { type: String },
        telefono: { type: String },
        calle: { type: String },
        numero: { type: String },
        localidad: { type: String },
      },
    ],
    usuario: String,
  },
  {
    collection: "Reg_llamada",
    timestamps: true,
  }
);
reg_llamadaSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser único",
});
module.exports = mongoose.model("Reg_llamada", reg_llamadaSchema);
