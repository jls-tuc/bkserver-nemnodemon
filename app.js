const express = require('express');
const bd = require('./conexion_bd');
const bodyParser = require('body-parser');

// inicia el servidor
const app = express();

// Parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//rutas importadas desde la carpeta Server/routes 
const appRoutes = require('./server/routes/routes')
const usuarioRoutes = require('./server/routes/usuarios.routes')
const loginRoutes = require('./server/routes/login.routes')

//Rutas para el acceso desde la APP
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);
// declarar puerto
app.listen(8017, () => {
    console.log('Express server puerto 8017: \x1b[32m%s\x1b[0m', 'online')
});

module.exports = app;