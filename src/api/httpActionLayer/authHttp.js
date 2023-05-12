const response = require ('express');
const {
    logInFirebaseBll,
    logInEmaillPassowrdBll,
    registerAppBll
} = require('../businessLogicLayer/authBll')



exports.loginFirebaseHttp = async(req,res=response) => {
    try {
        const {
            correo
        } = req.body
        const {adminDB} = req.dbConnections;
        const result =  await logInFirebaseBll(adminDB,correo)
        return res.status(200).json({
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error:'Usuario no reguistrado'
        })
    }
}

exports.logInEmaillPassowrdHttp = async(req,res=response) => {
    try {
        const {
            correo,
            contraseña
        } = req.body
        const {adminDB} = req.dbConnections
        const result = await logInEmaillPassowrdBll(adminDB,correo,contraseña)
        return res.status(200).json({
            result
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error:'Usuario no registrado'
        })
    }
}

exports.registerAppHttp = async (req,res=response) => {
    try {
        const {
            correo,
            contraseña,
            nombreUsuario,
            name,
            firstName,
            lastName
        } = req.body
        
        const {adminDB} = req.dbConnections
        const result = await registerAppBll(adminDB, correo,contraseña,nombreUsuario,name,firstName,lastName)
        return res.status(200).json({
            result:"Usuario registrado con exito"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error:"Error al registrar al usuario vuelva a intentarlo"
        })
    }
}