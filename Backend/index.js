const express = require('express');
require('./dbConnection');
const app = express(),
      port = 3000;
      multer = require('multer');
      cors = require('cors');
      upload = multer({dest:'./Routes/IMGS/'});

module.exports = upload;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json())

//Routes
app.use("/api/file",require('./Routes/IMGS/image'))
app.use("/api/pruebas",require('./Routes/QST/pruebas'))
app.use(express.static('public'));

//Run server
app.listen(port, (error) => {
    if(error)
        console.log('An error occurred starting the server')
    else
    console.log(`Server listening on the port::${port}`);
});