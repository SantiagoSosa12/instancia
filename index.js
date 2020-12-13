
const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const multer = require('multer');
var imagenPrueba = 'imagenPrueba.png';
var Jimp = require('jimp');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


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
    console.log('Storage location is .... ${')
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
    return res.send(req.file);
})

app.post('/subir2' , upload.single('file') , (req, res) => {
    console.log('Storage location is .... ${')
    return res.send(req.file);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

