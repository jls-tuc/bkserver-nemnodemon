const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const laboralSchema = new Schema({
    dependencia: {
        type: String,
        es_indexes: true,
        require: [true, "Debe ingresar el nombre"],
    },
    n_empleado: {
        type: String,
        es_indexes: true,
        require: [true, "Debe ingresar el numero de empleado"],
    },
    presta_servicio: {
        type: String,
        es_indexes: true,
        require: [
            true,
            "Debe ingresar el nombre del lugar donde presta el servicio",
        ],
    },
    telefono_empelador: {
        type: String,
        require: [true, "Debe ingresar el numero de telefo "],
    },
    persona: { type: Schema.Types.ObjectId, required: true, ref: "Persona" },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "Usuario" },
}, {
    collection: "laboral",
    timestamps: true,
});
module.exports = mongoose.model("Laboral", laboralSchema);