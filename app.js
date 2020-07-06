const express = require('express');
const bd = require('./conexion_bd');
const bodyParser = require('body-parser');

// inicia el servidor
const app = express();

// Parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())







// Serve index config

/* var serveIndex = require ('serve-index');
app.use (express.static(_dirname + '/'))
app.use( './server/uploads',serveIndex(__dirname + './server/uploads')); */

//rutas importadas desde la carpeta Server/routes 
const appRoutes = require('./server/routes/routes')
const usuarioRoutes = require('./server/routes/usuarios.routes')
const edificioRoutes = require('./server/routes/edificio.routes')
const loginRoutes = require('./server/routes/login.routes')
const personaRoutes = require('./server/routes/personas.routes')
const laboralRoutes = require('./server/routes/laboral.routes')
const registroRoutes = require('./server/routes/registro.routes')
const uploadRoutes = require('./server/routes/uploads')
const imgRoutes = require('./server/routes/img.routes')
const servWeb = require('./server/routes/ws.routes')



//Rutas para el acceso desde la APP
app.use('/usuario', usuarioRoutes);
app.use('/edificio', edificioRoutes);
app.use('/login', loginRoutes);
app.use('/persona', personaRoutes);
app.use('/laboral', laboralRoutes);
app.use('/registro', registroRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imgRoutes);
app.use('/servicio', servWeb);
app.use('/', appRoutes);





// declarar puerto
app.listen(8017, () => {
    console.log('Express server puerto 8017: \x1b[32m%s\x1b[0m', 'online')
});

module.exports = app;