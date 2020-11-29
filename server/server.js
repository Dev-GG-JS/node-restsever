//Requiere
require('./config/config')
require('./routes/usuario')
const express = require("express");
const mongoose = require("mongoose");

var bodyParser = require("body-parser");


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use( require("./routes/usuario"))

app.listen(process.env.PORT, () => {
  console.log(`Escuchando el puerto ${process.env.PORT}` );
});


const conetarBD = async() =>{
  
  const BD = await mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  return BD;
}

conetarBD()
  .then(resp => {

    console.log('La base de datos a sido conectada con exito');
  })
  .catch(err => {
  
    console.log('Ha ocurrido un error');
    console.log(err);
  })