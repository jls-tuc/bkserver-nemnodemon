const Usuario = require('../../server/models/usuario');
const Persona = require('../../server/models/personas');
const Edificio = require('../../server/models/edificio');
const fs = require('fs'); //fs para leer los archivos del sistema



const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'personas':
            const persona = await Persona.findById(id);
            if (!persona) {
                console.log('No es encontra el  id de la persona');
                return false;
            }

            pathViejo = `./server/uploads/personas/${ persona.img }`;
            borrarImagen(pathViejo);

            persona.img = nombreArchivo;
            await persona.save();
            return true;

            break;

        case 'edificios':
            const edificio = await Edificio.findById(id);
            if (!edificio) {
                console.log('No es encontra el  id del edificio');
                return false;
            }

            pathViejo = `./server/uploads/edificios/${ edificio.img }`;
            borrarImagen(pathViejo);

            edificio.img = nombreArchivo;
            await edificio.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es encontra el id del usuario');
                return false;
            }

            pathViejo = `./server/uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            console.log(usuario.img);
            await usuario.save();
            return true;

            break;
    }


}



module.exports = {
    actualizarImagen
}