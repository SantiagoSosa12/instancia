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
const stream = fs.createReadStream('./subida/imagenPrueba.png');


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
    setTimeout(escribirEnLaImgen, 10000, 'Frase');
    setTimeout(reSendImage, 10000, 'devuelve imagen');
    return res.send(req.file);
})

function escribirEnLaImgen(){
    console.log('Se esta escribiendo la frase..');
    Jimp.read('./subida/imagenPrueba.png')
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
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
    var data = new FormData();
    data.append("myImage", stream);
    fromOtherServer = axios.post('http://192.168.0.11:3001/subir', data, data.getHeaders())
    .then(function (response) {
      console.log('Devolviendo imagen con la frase..');
    })
    .catch(function(error) {
      console.log(error);
    });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

