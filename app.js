const express = require('express');
// inicia el servidor
const app = express();
const bd = require('./conexion_bd')


//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion correcta'
    })
});

// declarar puerto
app.listen(8017, () => {
    console.log('Express server puerto 8017: \x1b[32m%s\x1b[0m', 'online')
});

module.exports = app;