const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registroSchema = new Schema({

    tipo_registro: { type: String, requiere: true, enum: ['Visitante', 'Empleado', 'Prestador de servicio'] },
    estado: { type: String, requiere: true, enum: ['ingreso', 'salida'] },
    temperatura: { type: String, require: [true, 'Debe ingresar el registro de temperatura'] },
    fechahora: { type: Date, required: true, default: Date.now },
    persona: { type: Schema.Types.ObjectId, required: true, ref: 'Persona', required: true },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario', required: true },
    edificio: { type: Schema.Types.ObjectId, required: true, ref: 'Efidicio', required: true },


}, {
    collection: 'registro',
    timestamps: true
});
module.exports = mongoose.model('Registro', registroSchema);