const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const personaSchema = new Schema({
    ID_TRAMITE_PRINCIPAL:{type: String},
    ID_TRAMITE_TARJETA_REIMPRESA:{type: String},
    EJEMPLAR:{type: String},
    vencimiento:{type:String},
    emision:{type:String},
    nombres: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre"],
    },
    apellido: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el apellido"],
    },
    fechaNacimiento: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar la fecha de nacimiento"],
    },
    documento: {
        type: String,
        unique: true,
        require: [true, "Debe ingresar el numero de documento"],
    },
    cuil: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el cuil"],
    },
    sexo: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el sexo segun el DNI"],
    },
    calle: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre de la calle"],
    },
    numero: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el numero de la calle"],
    },
    piso: { type: String, es_indexed: true, require: false },
    departamento: { type: String, es_indexed: true, require: false },
    cpostal: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el codigo postal"],
    },
    barrio: { type: String, es_indexed: true, require: false },
    monoblock: { type: String, es_indexed: true, require: false },
    ciudad: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre del departamento"],
    },
    municipio: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre de la localidad"],
    },
    provincia: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre de la provincia"],
    },
    pais: {
        type: String,
        es_indexed: true,
        require: [true, "Debe ingresar el nombre del pais"],
    },
    idciudadano: {type: String},
    foto: { type: String, require: false },
    origenf: { type: String, require: false },
    datos_contacto: {
        telefono: { type: String, require: true },
        email: {
            type: String,
            unique: true,
        },
    },
    domicilio_postal: {
        calle: { type: String, es_indexed: true, require: false },
        numero: { type: String, es_indexed: true, require: false },
        piso: { type: String, es_indexed: true, require: false },
        departamento: { type: String, es_indexed: true, require: false },
        cpostal: { type: String, es_indexed: true, require: false },
        barrio: { type: String, es_indexed: true, require: false },
        localidad: { type: String, es_indexed: true, require: false },
        provincia: { type: String, es_indexed: true, require: false },
    },
    
}, {
    collection: "persona",
    timestamps: true,
});
personaSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Persona", personaSchema);