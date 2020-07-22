const mongoose = require('mongoose');
const { collection } = require('./usuario');
const Schema = mongoose.Schema

const edificioSchema = new Schema({
    nombre: { type: String, require: [true, 'Debe ingresar el nombre'] },
    localidad: { type: String, require: [true, 'Debe ingresar el nombre de la localidad'] },
    direccion: { type: String, require: [true, 'Debe ingresar el nombre'] },
    img: { type: String, require: false },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    sector: { type: Schema.Types.ObjectId, required: true, ref: 'Sector' },
    acceso: { type: Schema.Types.ObjectId, required: true, ref: 'Acceso' }
}, {
    collection: 'edificio',
    timestamps: true
});

module.exports = mongoose.model('Edificio', edificioSchema);