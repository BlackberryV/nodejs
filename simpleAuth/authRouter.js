import {Router} from "express";
import AuthController from "./AuthController.js";
import {body} from "express-validator";
import {roleMiddleware} from "./middleware/roleMiddleware.js";

const router = new Router();

router.post('/register',
    body("username", "Username can not be empty").notEmpty(),
    body('password', 'Password needs to be longer than 4 symbols').isLength({min: 4}),
    AuthController.register)
router.post('/login', AuthController.login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), AuthController.getUsers)

export default router