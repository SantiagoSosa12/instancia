
const express = require('express')
const app = express()
const port = 3000
var Jimp = require("jimp");


app.post('/images', (req, res) => {
    Jimp.read(req.file , function(err , test) {
        if(err) throw err;
        test 
            .write("La venganza nunca es buena, mata el alma y la envenena");
        next();
    })
    res.send(req.file);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
