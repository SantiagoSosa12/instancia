const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination:(req , file, cb)=>{
        cb(null, './subida')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

app.use(express.json());
app.use(express.urlencoded( { extended: true} ));


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/subir' , upload.single('file'), (req, res)=>{
    console.log(`Storage location is :${req.hostname}/${req.file.path}`);
    return res.send(req.file);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


