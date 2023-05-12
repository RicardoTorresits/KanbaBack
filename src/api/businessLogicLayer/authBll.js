const { response } = require('express');
const _ = require('lodash')
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
        const result= await logInEmaillPassowrdDall(db,correo,contraseña)
        return result
    } catch (error) {
        throw error
    }
}

exports.registerAppBll = async(db,correo,contraseña,nombreUsuario,name,firstName,lastName) => {
    try {
        const result = await registerAppDall(db,correo,contraseña,nombreUsuario,name,firstName,lastName)
    } catch (error) {
        throw error
    }
}