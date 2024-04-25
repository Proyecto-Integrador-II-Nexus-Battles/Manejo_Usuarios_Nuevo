import { Router } from "express";
import { restrictToLocalhost } from "../middleware/checkIP.js";

import { userController } from "../controllers/controller.js";

// En este archivo unicamente tendremos las rutas con los endPoints a las diversas peticiones que tienen las otras APIs o views

export const userRouter = Router();

userRouter.get("/admin", userController.getUsername);
userRouter.get("/IDusuario", userController.getIDUsername);
userRouter.get("/buscar_usuario", userController.buscarUsername);
userRouter.get("/user/:username", userController.getUserInfoController);
userRouter.get("/user/id/:id", userController.getUserInfoControllerByID);
userRouter.post("/cuenta", userController.miCuentaController);
userRouter.post("/cuenta/id", userController.miCuentaController);
userRouter.patch("/newData", userController.miCuentaPatchController);
//ruta para el envio de informacion para el login
userRouter.post("/logIn", userController.LogIn);
//ruta para el envio de informacion para el registro
userRouter.post("/register", userController.register);
userRouter.post("/vitrinarecibir", userController.recibir);
