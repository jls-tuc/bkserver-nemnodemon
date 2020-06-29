const mongoose = require('mongoose')
const Schema = mongoose.Schema

const registroSchema = new Schema({

    tipo_registro: { type: String, requiere: true, enum: ['Visitante', 'Empleado', 'Prestador de servicio'] },
    estado: { type: String, requiere: true, enum: ['ingreso', 'salida'] },
    temperatura: { type: String, require: [true, 'Debe ingresar el registro de temperatura'] },
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    edificio: { type: Schema.Types.ObjectId, ref: 'Efidicio' },


}, {
    collection: 'registro',
    timestamps: true
});
module.exports = mongoose.model('Registro', registroSchema);