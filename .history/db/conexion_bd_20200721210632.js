const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;


/* mongoose.connection.openUri('mongodb://localhost:27017/acceso_temp', (err, res) => {
    if (err) throw err;
    console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online')

}) */


const dbConnection = async() => {

    try {
        await mongoose.connection.openUri(process.env.conex_bd, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online')
    } catch (error) {
        console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine')
    }

}

module.exports = {
    dbConnection
}