const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();
const Edificio = require('../models/edificio');
const Usuario = require('../models/usuario');


// default options
app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) => {

    let tipo = req.params.tipo;
    let id = req.params.id;
    //colecciones  (modelos) donde se puede subir archivos

    let colecciones = ['edificio', 'usuario'];
    if (colecciones.indexOf(tipo) < 0) {
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La coleccion no es valida',
                error: { message: 'Debe seleccionar coleccion habilitada: ' + colecciones.join(', ') }
            });
        }
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono el archivo ',
            error: { message: 'Debe seleccionar una imagen' }
        });
    }
    // obtener el nombre de la imagen

    var archivo = req.files.imagen;
    var nombre = archivo.name.split('.');
    var extencion = nombre[nombre.length - 1];

    //extenciones permitidas

    var extenciones = ['png', 'jpg', 'jpeg'];
    if (extenciones.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'La extencion de archivo no es correcta',
            error: { message: ' Debe seleccionar una extencion correcta: ' + extenciones.join(' , ') }
        });
    }
    // introducir nombre al archivo

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencion}`;

    // mv el archivo
    let path = `./server/uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({

                ok: false,
                mensaje: ' No se pudo guardar el archivo, verificar direccion',
                error: err,
            });
        }

        subirTipo(tipo, id, nombreArchivo, res);


        /* return res.status(200).json({
            ok: true,
            mensaje: 'Archivo cargado correctamente.!!'
        }); */
    });
});

function subirTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'edificio') {
        Edificio.findById(id, (err, edificio) => {


            // verificamos si existe el id, para cargar los datos
            if (!edificio) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El edificio no existe',
                    errors: { message: 'Los datos ingresados son incorrectos ID:' + id }
                });
            }

            // si existe el id, buscamos la direccion vieja 

            let pathViejo = `./server/uploads/edificio/${edificio.img}`;
            console.log(pathViejo) // verificar si la dir esta bien!
                //si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }
            edificio.img = nombreArchivo;
            edificio.save((err, edificioActualizado) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar archivo',
                        error: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    mensaje: 'El archivo se actualizo correctamente',
                    edificio: edificioActualizado,

                });
            });
        })
    }
    if (tipo === 'usuario') {
        Usuario.findById(id, (err, usuario) => {

            // verificamos si existe el id, para cargar los datos
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario no existe',
                    errors: { message: 'Los datos ingresados son incorrectos ID:' + id }
                });
            }
            // si existe el id, buscamos la direccion vieja  
            let pathViejo = `'./server/uploads/usuario/' +${ usuario.imagen}`;
            //si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                usuarioActualizado.password = ';)'
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar archivo',
                        error: err,
                    });
                }
                res.status(200).json({
                    ok: true,
                    mensaje: 'El archivo se actualizo correctamente',
                    usuario: usuarioActualizado,
                });
            })

        })
    };

};


module.exports = app;