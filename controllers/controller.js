import { userModel } from "../models/models.js"
import bcrypt from 'bcrypt';
import { json } from "express";
import session from 'express-session';


// En esta clase se encarga de controlar los datos y consultas (get-post) y devolverlas en formato JSON
// Hacia la vista que las requiera 
export class userController { // --> TODOS LOS ARCHIVOS FUNCIONAM COMO UNA CAJA FUERTE
    static async getUsername(req, res) {
        const usernames = await userModel.getUsers();
        res.json(usernames);
    }

    static async buscarUsername(req, res) {
        const query = req.query.q;
        const resultados = await userModel.searchUsers(query);
        res.json(resultados);
    }

    static async getUserInfoController(req, res) {
        const username = req.params.username;
        const user = await userModel.getUserInfo(username);
        res.json(user);
    }

    // Función para iniciar sesión de usuario
    static async LogIn(req, res) {
        // Se obtienen el correo electrónico y la contraseña del cuerpo de la solicitud
        let email = req.body.email;
        let password = req.body.password;

        // Se obtienen el correo electrónico y la contraseña almacenados en la base de datos
        let email_db = await userModel.getUserEmail(email);
        let password_db = await userModel.getPassword(email);

        // Se verifica si el correo electrónico y la contraseña coinciden con los de la base de datos
        if (email === email_db && bcrypt.compareSync(password, password_db)) {
            // Si el usuario ya está autenticado, se devuelve la información del usuario
            if (req.session.authenticated) {
                res.json(req.session.user);
            } else {
                // Si el usuario no está autenticado, se establece la sesión como autenticada
                // y se guarda la información del usuario en la sesión
                req.session.authenticated = true;
                req.session.user = {
                    email,
                    id
                };
                console.log(req.session.user);
                res.json(req.session.user);
            }
        } else {
            // Si las credenciales no coinciden, se devuelve un mensaje de error
            res.json('not authenticated');
        }
    }


    // Función para cerrar sesión de usuario
    static async LogOut(req, res) {
        // Se destruye la sesión del usuario
        req.session.destroy(function (err) {
            if (err) {
                // Si hay un error al destruir la sesión, se imprime en la consola
                console.log(err);
                // Se envía una respuesta al cliente indicando que ha salido de la sesión
                res.json('Salió de la sesión');
            }
        });
    }

    static async register(req, res) {

        try {
            const hash = await bcrypt.hash(req.body.password, 12);
            const { nombre, apellido, email, metodospago, numero_tarjeta, cvv, fecha_exp, pregunta_1, pregunta_2, pregunta_3 } = req.body;

            // Inserta los datos del usuario en la base de datos utilizando pool.query
            await pool.query(
                "INSERT INTO sofia.users(nombre, apellido, email, password, metodospago, numero_tarjeta, cvv, fecha_exp, pregunta_1, pregunta_2, pregunta_3) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                [nombre, apellido, email, hash, metodospago, numero_tarjeta, cvv, fecha_exp, pregunta_1, pregunta_2, pregunta_3]
            );

            // Si la inserción fue exitosa, responde con un mensaje de éxito
            res.json("Usuario registrado exitosamente");
        } catch (err) {
            // Si hay un error, imprímelo en la consola y responde con un mensaje de error al cliente
            console.log("Error al registrar usuario: ", err);
            res.status(500).json("Error interno del servidor");
        }





    }




}


