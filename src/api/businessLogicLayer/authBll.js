const { response } = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const {
    logInFirebaseDall,
    logInEmaillPassowrdDall,
    registerAppDall
} = require('../dataAccessLayer/authDall')

exports.logInFirebaseBll = async(db,correo) => {
    try {
        const result = await logInFirebaseDall(db,correo)
        return result
    } catch (error) {
        throw error
    }
}

exports.logInEmaillPassowrdBll = async(db,correo,contraseña) => {
    try {
        const result= await logInEmaillPassowrdDall(db,correo)
        if(result[0]["Acceso"]==='No'){
            return result='No'
        }
        const userPassword = result[0]["password"];
        const comparePassword = await bcrypt.compare(contraseña,userPassword)
        
        if(!comparePassword){
            return result='No'
        }

        const token = await generaraJWT(
            result[0]["idUsuario"],result[0]["nombre"],result[0]["correo"]
        )
        return result,token
    } catch (error) {
        throw error
    }
}

exports.registerAppBll = async(db,correo,contraseña,nombreUsuario,name,firstName,lastName) => {
    try {
        const salt = await bcrypt.genSalt(10);
       const contrasena = bcrypt.hashSync(contraseña,salt)
        const result = await registerAppDall(db,correo,contrasena,nombreUsuario,name,firstName,lastName)
    } catch (error) {
        throw error
    }
}