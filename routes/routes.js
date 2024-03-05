import { Router } from 'express'

import { userController } from "../controllers/controller.js"

// En este archivo unicamente tendremos las rutas con los endPoints a las diversas peticiones que tienen las otras APIs o views

export const userRouter = Router()

userRouter.get('/admin', userController.getUsername);
userRouter.get('/buscar_usuario', userController.buscarUsername);
userRouter.get('/:username', userController.getUserInfoController);

//ruta para el envio de informacion para el login
userRouter.post('/logIn', userController.LogIn);
//ruta para el envio de informacion para el registro
userRouter.post('/register', userController.register)
