const mongoose = require("mongoose");
const constantes = require("../../ws/constantes");
const Schema = mongoose.Schema;

const registroSchema = new Schema({
    nroRegistro: { type: Number, unique: true },
<<<<<<< HEAD
    fecha: { type: Date, default: Date.now },
=======
    fecha: { type: Date, default: () => Date.now },
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    tipo_registro: {
        type: String,
        requiere: true,
        enum: [
            "Visitante",
            "Empleado",
            "Prestador de servicio",
            "Funcionario público",
        ],
    },
    estado: { type: String, requiere: true, enum: ["ingreso", "salida"] },
    temperatura: {
        type: String,
        require: [true, "Debe ingresar el registro de temperatura"],
    },
    persona: {
        nombre: { type: String, lowercase: true },
        apellido: { type: String, lowercase: true },
        documento: { type: String, lowercase: true },
        fechaNacimiento: String,
        sexo: constantes.SEXO,
        telefono: { type: String, lowercase: true },
<<<<<<< HEAD
=======
        email: {
            type: String,
            unique: true,
            required: [true, "El correo es necesario"],
        },
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
        domicilio: { type: String, lowercase: true },
        localidad: { type: String, lowercase: true },
        img: { type: String },
    },
    edificio: {
        nombre: { type: String, require: [true, "Debe ingresar el nombre"] },
        localidad: {
            type: String,
            require: [true, "Debe ingresar el nombre de la localidad"],
        },
        direccion: { type: String, require: [true, "Debe ingresar el nombre"] },
        img: { type: String, require: false },
    },

    sector: {
        nombre: {
            type: String,
            es_indexes: true,
            require: [true, "Debe ingresar el nombre"],
        },
    },
    acceso: {
        nombre: { type: String, require: [true, "Debe ingresar el nombre"] },
    },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "Usuario" },
}, {
    collection: "registro",
    timestamps: true,
});
module.exports = mongoose.model("Registro", registroSchema);