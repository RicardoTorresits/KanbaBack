const  Router = require( "express");
const router = Router();
const {
    loginFirebaseHttp,
    logInEmaillPassowrdHttp,
    registerAppHttp
} = require('../api/httpActionLayer/authHttp')

router.post("/loginFirebase",loginFirebaseHttp);
router.post("/logInEmaillPassowrd",logInEmaillPassowrdHttp);
router.post("/registerApp",registerAppHttp)


export default router;