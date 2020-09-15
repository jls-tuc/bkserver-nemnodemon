const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

/* mongoose.connection.openUri('mongodb://localhost:27017/acceso_temp', (err, res) => {
    if (err) throw err;
    console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online')

}) */

const dbConnection = async() => {
    try {
        await mongoose.connection.openUri(process.env.conex_bd, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
<<<<<<< HEAD
        console.log("Mongo DB puerto 28018: \x1b[32m%s\x1b[0m", "online");
=======
        console.log("Mongo DB puerto 27017: \x1b[32m%s\x1b[0m", "online");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    } catch (error) {
        console.log(
            error + "Error al iniciar la base de datos:\x1b[41m%s\x1b[0m",
            "OffLine"
        );
    }
};

<<<<<<< HEAD
const dbArsat = async() => {
    try {
        await mongoose.connection.openUri(process.env.CONEX_ARSAT, {
=======
const dbOptic = async() => {
    try {
        await mongoose.connection.openUri(process.env.conex_bd, {
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
<<<<<<< HEAD
        console.log("Mongo DB puerto 28018: \x1b[32m%s\x1b[0m", "online");
=======
        console.log("Mongo DB puerto 27017: \x1b[32m%s\x1b[0m", "online");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    } catch (error) {
        console.log(
            error + "Error al iniciar la base de datos:\x1b[41m%s\x1b[0m",
            "OffLine"
        );
    }
};

module.exports = {
    dbConnection,
<<<<<<< HEAD
    dbArsat,
=======
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
};