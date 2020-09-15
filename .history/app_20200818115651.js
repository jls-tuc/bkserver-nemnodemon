require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./db/conexion_bd');
const bodyParser = require('body-parser');
const cors = require('cors');

// inicia el servidor
const app = express();
// base de datos
dbConnection();
// cors
app.use(cors());
// handle OPTIONS requests from the browser
app.options("*", function(req, res, next) { res.send(200); });



// Parse

app.use(bodyParser.urlencoded({
    extended: true
}));
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
const uploadRoutes = require('./server/routes/uploads.routes')
const servWeb = require('./server/routes/ws.routes')
const accesoRoutes = require('./server/routes/acceso.routes')
const sectorRoutes = require('./server/routes/sector.routes')
const busquedaRoutes = require('./server/routes/busquedas.routes')


//Rutas para el acceso desde la APP
app.use('/acceso', accesoRoutes)
app.use('/sector', sectorRoutes)
app.use('/usuario', usuarioRoutes);
app.use('/edificio', edificioRoutes);
app.use('/login', loginRoutes);
app.use('/persona', personaRoutes);
app.use('/laboral', laboralRoutes);
app.use('/registro', registroRoutes);
app.use('/upload', uploadRoutes);
app.use('/servicio', servWeb);
app.use('/busqueda', busquedaRoutes);

app.use('/', appRoutes);





// declarar puerto
app.listen(process.env.PORT, () => {
    console.log('Express server puerto =', process.env.PORT, '\x1b[32m :online\x1b[0m')
});

module.exports = app;