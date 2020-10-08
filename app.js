require("dotenv").config();
const express = require("express");
const { dbArsat } = require("./db/conexion_bd");
const bodyParser = require("body-parser");
const cors = require("cors");

(async() => {
    // base de datos
    await dbArsat();
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

<<<<<<< HEAD
  //rutas importadas desde la carpeta Server/routes
  const appRoutes = require("./server/routes/ej.routes");
  const usuarioRoutes = require("./server/routes/commons/usuarios.routes");
  const loginRoutes = require("./server/routes/commons/login.routes");
  const personaRoutes = require("./server/routes/commons/personas.routes");
  const laboralRoutes = require("./server/routes/laboral.routes");
  const registroRoutes = require("./server/routes/registro.routes");
  const servWeb = require("./server/routes/ws.routes");
  const busquedaRoutes = require("./server/routes/commons/busquedas.routes");
  const localidadesRoutes = require("./server/routes/commons/localidades.routes");
  const form0800Router = require("./server/routes/form0800.routes");
  const reg_0800Router = require("./server/routes/0800/Reg_llamada.routes");
  const exportRoutes = require("./server/routes/export.routes");

  //Rutas para el acceso desde la APP
  app.use("/localidades", localidadesRoutes);
  app.use("/form", form0800Router);
  app.use("/llamada", reg_0800Router);
  app.use("/usuario", usuarioRoutes);
  app.use("/login", loginRoutes);
  app.use("/persona", personaRoutes);
  app.use("/laboral", laboralRoutes);
  app.use("/registro", registroRoutes);
  app.use("/servicio", servWeb);
  app.use("/busqueda", busquedaRoutes);
  app.use("/export", exportRoutes);
=======
    //rutas importadas desde la carpeta Server/routes
    const appRoutes = require("./server/routes/commons/ej.routes");
    const usuarioRoutes = require("./server/routes/commons/usuarios.routes");
    const loginRoutes = require("./server/routes/commons/login.routes");
    const personaRoutes = require("./server/routes/commons/personas.routes");
    const laboralRoutes = require("./server/routes/laboral.routes");
    const registroRoutes = require("./server/routes/acceso/registro.routes");
    const servWeb = require("./server/routes/ws.routes");
    const busquedaRoutes = require("./server/routes/commons/busquedas.routes");
    const localidadesRoutes = require("./server/routes/commons/localidades.routes");
    const form0800Router = require("./server/routes/0800/form0800.routes");
    const Reg_llamadaRouter = require("./server/routes/0800/Reg_llamada.routes");
    const exportRoutes = require("./server/routes/commons/export.routes");

    //Rutas para el acceso desde la APP
    app.use("/localidades", localidadesRoutes);
    app.use("/form", form0800Router);
    app.use("/llamada", Reg_llamadaRouter);
    app.use("/usuario", usuarioRoutes);
    app.use("/login", loginRoutes);
    app.use("/persona", personaRoutes);
    app.use("/laboral", laboralRoutes);
    app.use("/registro", registroRoutes);
    app.use("/servicio", servWeb);
    app.use("/busqueda", busquedaRoutes);
    app.use("/export", exportRoutes);
>>>>>>> bf153e8855648d5cb0bac6a3e9b71f86bb57f261

    app.use("/", appRoutes);
    // declarar puerto
    app.listen(process.env.PORTARSATTEST, () => {
        console.log(
            "Express server puerto =",
            process.env.PORTARSATTEST,
            "\x1b[32m :online\x1b[0m"
        );
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = {};