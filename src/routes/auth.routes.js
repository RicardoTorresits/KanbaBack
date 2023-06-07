const  Router = require( "express");
const router = Router();
const {
    loginFirebaseHttp,
    logInEmaillPassowrdHttp,
    registerAppHttp
} = require('../api/httpActionLayer/authHttp')
//login firease
router.post("/loginFirebase",loginFirebaseHttp);
//login con correo y contraseña
router.post("/logInEmaillPassowrd",logInEmaillPassowrdHttp);
//resgistro de  usuarios
router.post("/registerApp",registerAppHttp)


export default router;