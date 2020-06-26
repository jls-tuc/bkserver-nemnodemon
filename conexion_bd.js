const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connection.openUri('mongodb://localhost:27017/acceso_temp', (err, res) => {
    if (err) throw err;
    console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online')

})