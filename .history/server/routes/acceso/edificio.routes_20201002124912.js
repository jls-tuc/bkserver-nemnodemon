const express = require("express");
const app = express();
const mdAutenticacion = require("../../../config/middlewares/auth");

const Edificio = require("../../models/edificio");

app.get("/:id", (req, res, next) => {
    let id = req.params.id;
    try {
        Edificio.findById(id, "nombre localidad direccion img ") //pido lo que quiero ver
            .populate("usuario", "nombre")
            .populate("sector")
            .populate("acceso")
            .exec((err, edificio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error cargando edificio " + id,
                        errors: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    edificio: edificio,
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Error la buscar los datos verifique el ID",
            error,
        });
    }
});

app.get("/", (req, res, next) => {
    Edificio.find({}, "nombre localidad direccion img ") //pido lo que quiero ver
        .populate("usuario", "usuario")
        .exec((err, edificios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error cargando edificio",
                    errors: err,
                });
            }
            Edificio.count({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error cargando edificio",
                        errors: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    edificios: edificios,
                    total: conteo,
                });
            });
        });
});

app.put("/:id", mdAutenticacion.verificaToken, async(req, res = response) => {
    let id = req.params.id;
    let body = req.body;
    try {
        cambEdi = {
            ...req.body,
            usuario: req.usuario._id,
        };
        const newEdificio = await Edificio.findOneAndUpdate(id, cambEdi, {
            new: true,
        });
        res.json({
            ok: true,
            edificio: newEdificio,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Verificar los datos enviados",
            error,
        });
    }
});

app.post("/", mdAutenticacion.verificaToken, async(req, res) => {
    let body = req.body;
    let edificio = new Edificio({
        ...req.body,
        usuario: req.usuario._id,
    });
    console.log(edificio);
    await edificio.save((err, edificioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear edificio",
                errors: err,
            });
        }
        res.status(201).json({
            ok: true,
            edificio: edificioGuardado,
        });
    });
});
app.delete("/:id", mdAutenticacion.verificaToken, (req, res) => {
    let id = req.params.id;
    Edificio.findByIdAndRemove(id, (err, edificioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error borrar el edificio",
                errors: err,
            });
        }
        if (!edificioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: "No existe un edificio con ese id",
                errors: { message: "No existe un edificio con ese id" },
            });
        }
        res.status(200).json({
            ok: true,
            edificio: edificioBorrado,
            mensaje: "Se elemino correctamente el " + Edificio.nombre,
        });
    });
});

module.exports = app;