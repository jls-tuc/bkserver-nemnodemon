require("dotenv").config();
const express = require("express");
<<<<<<< HEAD
const { dbArsat } = require("./db/conexion_bd");
=======
const { dbConnection } = require("./db/conexion_bd");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
const bodyParser = require("body-parser");
const cors = require("cors");

(async() => {
    // base de datos
<<<<<<< HEAD
    await dbArsat();
=======
    await dbConnection();
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    // inicia el servidor
    const app = express();
    // Parse
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // cors
    app.use(cors());
    // handle OPTIONS requests from the browser
    app.options("*", function(req, res, next) {
        res.send(200);
    });

    // Serve index config

    /* var serveIndex = require ('serve-index');
app.use (express.static(_dirname + '/'))
app.use( './server/uploads',serveIndex(__dirname + './server/uploads')); */

    //rutas importadas desde la carpeta Server/routes
<<<<<<< HEAD
    const appRoutes = require("./server/routes/ej.routes");
    const usuarioRoutes = require("./server/routes/usuarios.routes");
=======
    const appRoutes = require("./server/routes/routes");
    const usuarioRoutes = require("./server/routes/usuarios.routes");
    const edificioRoutes = require("./server/routes/edificio.routes");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    const loginRoutes = require("./server/routes/login.routes");
    const personaRoutes = require("./server/routes/personas.routes");
    const laboralRoutes = require("./server/routes/laboral.routes");
    const registroRoutes = require("./server/routes/registro.routes");
<<<<<<< HEAD
    const servWeb = require("./server/routes/ws.routes");
=======
    const uploadRoutes = require("./server/routes/uploads.routes");
    const servWeb = require("./server/routes/ws.routes");
    const accesoRoutes = require("./server/routes/acceso.routes");
    const sectorRoutes = require("./server/routes/sector.routes");
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    const busquedaRoutes = require("./server/routes/busquedas.routes");
    const localidadesRoutes = require("./server/routes/localidades.routes");

    //Rutas para el acceso desde la APP
    app.use("/localidades", localidadesRoutes);
<<<<<<< HEAD

    app.use("/usuario", usuarioRoutes);
=======
    app.use("/acceso", accesoRoutes);
    app.use("/sector", sectorRoutes);
    app.use("/usuario", usuarioRoutes);
    app.use("/edificio", edificioRoutes);
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    app.use("/login", loginRoutes);
    app.use("/persona", personaRoutes);
    app.use("/laboral", laboralRoutes);
    app.use("/registro", registroRoutes);
<<<<<<< HEAD
=======
    app.use("/upload", uploadRoutes);
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
    app.use("/servicio", servWeb);
    app.use("/busqueda", busquedaRoutes);

    app.use("/", appRoutes);
<<<<<<< HEAD
    // declarar puerto
    app.listen(process.env.PORTARSATTEST, () => {
        console.log(
            "Express server puerto =",
            process.env.PORTARSATTEST,
=======

    // declarar puerto
    app.listen(process.env.PORT, () => {
        console.log(
            "Express server puerto =",
            process.env.PORT,
>>>>>>> eae98e95944dff4123f47ccfa9462a6d150c1c97
            "\x1b[32m :online\x1b[0m"
        );
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = {};