const express = require('express')
const app = express()
const port = 3000

const path = require('path');
const multer = require('multer');
var imagenPrueba = 'imagenPrueba.png';
var Jimp = require('jimp');
var bodyParser = require('body-parser');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));


const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const { request } = require('http');
const { response } = require('express');


var imageCaption = 'La venganza nunca es buena mata el alma y la envenena';
var loadedImage;

let storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, './subida')
    },
    filename:(req, file, cb)=> {
        cb(null, imagenPrueba);
    }
});

const upload = multer({storage})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subir' , upload.single('file') , (req, res) => {
    setTimeout(escribirEnLaImgen, 15000);/*
    Si se coloca el mismo TimeOut solo llega una parte de la imagen
    */
    setTimeout(reSendImage, 30000);
    return res.send(req.file);
})

function escribirEnLaImgen(){
    console.log('Se esta escribiendo la frase..');
    Jimp.read('./subida/imagenPrueba.png')
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    })
    .then(function (font) {
        loadedImage.print(font, 10, 10, imageCaption)
        .write('./subida/imagenPrueba.png');
    })
    .catch(function (err) {
        console.error(err);
    });
}

function reSendImage() {
    console.log('Se esta reenviando la imagen...');
    var stream = fs.createReadStream('./subida/imagenPrueba.png');
    var data = new FormData();
    data.append('file', stream);/*Son parametros Clave Valor 
    DEBEN SER LOS MISMOS EN EL SERVIDOR DE DESTINO
    */
    var req = request(
        {
            host: '192.168.0.11',
            port: '3001',
            path: '/subir2',
            method: 'POST',
            headers: data.getHeaders(),
        },
        response => {
            console.log(response.statusCode);
        }
    );
    data.pipe(req);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

