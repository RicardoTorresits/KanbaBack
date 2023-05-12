const { response } = require('express');
const _ = require('lodash');

exports.logInFirebaseDall = async(db,correo) =>{
    try {
        const query = `stp_loginFirebaseApp @correo='${correo}'`
        const result = (await db.query(query)).recordset
        return result
    } catch (error) {
        throw error
    }
}

exports.logInEmaillPassowrdDall = async (db,correo,contraseña) => {
    try {
        const query = `exec stp_loginEmailPassowerd @correo='${correo}',@password'${contraseña}'`
        const result = (await db.query(query)).recordset
        return result
    } catch (error) {
        throw error
    }
}

exports.registerAppDall = async(db,correo,contraseña,nombreUsuario,name,firstName,lastName) => {
    try {
        const query = `stp_registerApp @correo='${correo}',@userName='${nombreUsuario}',@name='${name}',@firstName='${firstName}',@lastName='${lastName}',@password='${contraseña}'`
        const result = (await db.query(query)).recordset
        return result
    } catch (error) {
        throw error
    }
}