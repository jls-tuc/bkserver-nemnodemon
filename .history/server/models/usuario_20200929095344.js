const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = require("mongoose").Schema;
const rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol permitido",
};

const usuarioSchema = new Schema(
  {
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

    signupDate: {
      type: Date,
      default: () => Date.now(),
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      required: true,
      default: "USER_ROLE",
      enum: rolesValidos,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: [true, "El password es necesario"],
    },
    picture: {
      type: String,
      default:
        "http://bliskiemiejsce.pl/wp-content/uploads/2017/10/avatar-1170x1752.jpg",
    },
  },
  {
    collection: "usuario",
    timestamps: true,
  }
);
usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Usuario", usuarioSchema);
