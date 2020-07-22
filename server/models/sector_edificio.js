const mongoose = require('mongoose');

const Schema = mongoose.Schema

const sectorSchema = new Schema({
    nombre: { type: String, es_indexes: true, require: [true, 'Debe ingresar el nombre'] },
    capacidad: { type: String, es_indexes: true },
    piso: { type: String, es_indexes: true },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' }
}, {
    collection: 'sector',
    timestamps: true
});
module.exports = mongoose.model('Sector', sectorSchema);