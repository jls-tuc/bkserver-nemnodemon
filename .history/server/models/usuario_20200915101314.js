const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = require("mongoose").Schema;
const rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol permitido",
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    apellido: {
        type: String,
        required: [true, "El Apellido es necesario"],
    },
    documento: {
        type: String,
        unique: true,
        required: [true, "El numero de documento es necesario"],
    },
    organismo: {
        type: String,
        required: [true, "El organismo  es necesario"],
    },
    interno: {
        type: String,
    },
    box: {
        type: String,
    },
    signupDate: {
        type: Date,
        default: () => Date.now(),
    },
    lastLogin: {
        type: Date,
        default: () => Date.now(),
    },

    role: {
        type: String,
        required: true,
        default: "USER_ROLE",
        enum: rolesValidos,
    },
    password: {
        type: String,
        required: [true, "El password es necesario"],
    },
}, {
    collection: "usuario",
    timestamps: true,
});
usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Usuario", usuarioSchema);