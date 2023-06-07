const DbConnectionFactory = require('./../helpers/data/DbConnectionFactory');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

//midleware para poder aignar diferentes bases de datos(clientes) y verificar el token
const asignarDB = async (req, res, next) => {
    try {
        let empresa = null;
        let token = _.get(req, 'headers.authorization', '');
        token = token.replace('Bearer', '').trim();
        const whiteListURLs = [
            '/api/auth/loginFirebase',
            '/api/auth/logInEmaillPassowrd',
            'api/auth//registerApp'
        ];
        if(whiteListURLs.includes(req.url)){
            empresa = 'kanba'
            if(token){
                const {idUsuario, nombre, correo,} = jwt.verify(token, process.env.SECRET_JWT_SEED);
                req.usuario = {
                    idUsuario,
                    nombre,
                    correo,
                }
                return res.status(200).json({
                    idUsuario,
                    nombre,
                    correo,
                })
            }
            
        } else if(token) {
            const {idUsuario, nombre, correo} = jwt.verify(token, process.env.SECRET_JWT_SEED);
            console.log(req.usuario)
            req.usuario = {
                idUsuario,
                nombre,
                correo,
            }
            empresa = req.usuario.codigoEmpresa
        }

        if (_.isEmpty(empresa)) {
            return res.status(500).send('Bearer token is required');
        }

        req.dbConnections = {
            adminDB: await DbConnectionFactory.getConnection('kanba'.toLocaleLowerCase()),
            //mainDB: await DbConnectionFactory.getConnection(empresa.toLocaleLowerCase()),
        };

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Bearer token is required');
    }
}

module.exports = asignarDB;
