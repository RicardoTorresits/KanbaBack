const jwt = require('jsonwebtoken')

const generaJWT = (idUsuario = 0, nombre= '', correo ='', codigoEmpresa='', areaProyecto='')=>{

  return new Promise((resolve, reject)=>{
    const payload ={idUsuario, nombre, correo, codigoEmpresa, areaProyecto};

    jwt.sign(payload, process.env.SECRET_JWT_SEED,{},(err, token)=>{
      if(err){
        console.log(err);
        reject('No se pudo generar el token')
      }else{
        resolve(token)
      }
    })
  })
}

// const generaJWTForPasswordReset = (idUsuario = 0, correo ='', codigoEmpresa='')=>{

//   return new Promise((resolve, reject)=>{
//     const payload ={
//       idUsuario,
//       correo,
//       codigoEmpresa,
//     };

//     return jwt.sign (
//       payload,
//       process.env.SECRET_PASSWORD_RESET_JWT_SEED,
//       {
//         expiresIn: '1h'
//       },
//       (err, token)=>{
//         if(err){
//           console.log(err);
//           return reject('No se pudo generar el token')
//         } else {
//           return resolve(token)
//         }
//     });
//   })
// }


module.exports={
  generaJWT,
  generaJWTForPasswordReset,
}