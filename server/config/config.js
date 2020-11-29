

// ---------------------
// puerto
// ---------------------
process.env.PORT = process.env.PORT || 3000;

// ---------------------
// Entorno
// ---------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ---------------------
// Base de datos
// ---------------------
let urlDB='';
 if(process.env.NODE_ENV === 'dev'){
     urlDB= 'mongodb://localhost:27017/cafe';
}else{
    urlDB='mongodb+srv://Dev-GG:UCigfaLq3vNQ3jT@cluster0.4tzja.mongodb.net/cafe';
}


// 'mongodb://localhost:27017/cafe'

//

process.env.URLDB=urlDB;