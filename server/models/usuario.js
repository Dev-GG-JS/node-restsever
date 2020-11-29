const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol válido'
}

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required:[true, 'El nombre es necesario']
    },
    email:{
        type:String,
        unique:true,
        required: [true, 'El email es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img:{
        type: String,
        required:false,
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum:rolesValidos
    },
    estado:{
        type: Boolean,
        required:false,
        default:true
    },
    google:{
        type: Boolean,
        required:false,
        default:false
    }

})


//Mostrar el Schema
UsuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject= user.toObject();

    delete userObject.password;

    return userObject;
}

//Aplicar el unique validator
UsuarioSchema.plugin(uniqueValidator, {
    ok:false,
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Usuario', UsuarioSchema)