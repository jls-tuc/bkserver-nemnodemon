const { response } = require("express");
const Registro = require("../models/registro");



const getRegistro = async(req, res = response) => {
    try {
        const registros = await Registro.find()
            .populate('usuario', 'nombre')
            .populate('persona', 'nombre apellido documento img')
            .populate('edificio', 'nombre localidad direccion');

        res.status(200).json({
            ok: true,
            registros

        });


    } catch (error) {
        res.status(404).json({
            ok: false,
            error
        })
    }
}

const getRegistroById = async(req, res = response) => {
    let id = req.params.id;

    try {
        const registro = await Registro.findById(id)
            .populate('usuario', 'nombre')
            .populate('persona', 'nombre apellido documento img')
            .populate('edificio', 'nombre localidad direccion');

        res.status(200).json({
            ok: true,
            registro
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al realizar la busqueda, verifique el ID',
            error
        })

    }
}

const crearRegistro = async(req, res = response) => {
    let body = req.body;
    const registro = new Registro({
        tipo_registro: body.tipo_registro.toLowerCase(),
        estado: body.estado,
        temperatura: temperatura.body.estado,
        fechahora: fechahora.body.estado,
        persona: body.persona,
        usuario: req.usuario._id,
        edificio: body.edificio
    });
    try {
        const registroDB = await registro.save();

        console.log(registroDB);

        res.status(400).json({
            ok: true,
            msg: "Datos guardos correctamente",
            registro: registroDB
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error al guardar la informacion, verifique los datos",
            error
        })

    }

}



const updateRegistro = async(req, res = response) => {

    let id = req.params.id;
    let body = req.body;
    try {
        const update = {

            tipo_registro: body.tipo_registro.toLowerCase(),
            estado: body.estado,
            temperatura: temperatura.body.estado,
            persona: body.persona,
            usuario: req.usuario._id,
            edificio: body.edificio
        }

        const registroUpdate = await Registro.findOneAndUpdate(id, update, { new: true });
        console.log(registroUpdate);
        res.status(200).json({
            ok: true,
            msg: "Datos actualizados correctamente",
            registro: registroUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(200).json({
            ok: false,
            msg: "Verificar los datos",
            error
        })
    }
}

const deleteRegistro = async(req, res = response) => {
    let id = req.params.id

    try {
        await Registro.findOneAndRemove(id);
        res.json({
            ok: true,
            msg: 'Datos borrados correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Verificar los datos enviados',
            error
        })

    }
}

module.exports = {

    getRegistro,
    getRegistroById,
    crearRegistro,
    updateRegistro,
    deleteRegistro
}