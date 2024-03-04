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

    static async LogIn(req, res) {

        let email = req.body.email;
        let password = req.body.password;

        let email_db = await userModel.getUserEmail(email);
        let password_db = await userModel.getPassword(email);

        if (email === email_db && bcrypt.compareSync(password, password_db)) {

            if (req.session.authenticated) {

                res.json(req.session.user);

            } else {

                req.session.authenticated = true;
                req.session.user = {
                    email, id
                };
                console.log(req.session.user)
                res.json(req.session.user);
            }


        } else {

            res.json('not authenticated')
        }

    }
    // Create
    // Upload
    // Delete
}
