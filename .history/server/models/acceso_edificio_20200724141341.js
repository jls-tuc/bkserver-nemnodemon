const mongoose = require('mongoose');

const Schema = mongoose.Schema

const accesoSchema = new Schema({
    nombre: { type: String, require: [true, 'Debe ingresar el nombre'] },
    direccion: { type: String, require: [true, 'Debe ingresar la direccion de la entrada'] },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' }
}, {
    collection: 'acceso',
    timestamps: true
});
module.exports = mongoose.model('Acceso', accesoSchema);