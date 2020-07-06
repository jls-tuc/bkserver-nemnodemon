const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.get('/:tipo/:img', (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathImg = path.resolve(__dirname, `../uploads/${tipo}/${img}`);
    console.log(pathImg)
    if (fs.existsSync(pathImg)) {

        res.sendFile(pathImg);
    } else {
        let pathNoImg = path.resolve(__dirname, `../../assets/no-imagen.jpg`);
        res.sendFile(pathNoImg);
    }

});

module.exports = app;