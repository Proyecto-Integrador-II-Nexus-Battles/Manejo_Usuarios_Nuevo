import { userModel } from "../models/models.js"


// En esta clase se encarga de controlar los datos y consultas (get-post) y devolverlas en formato JSON
// Hacia la vista que las requiera 
export class userController { // --> TODOS LOS ARCHIVOS FUNCIONAM COMO UNA CAJA FUERTE
    static async getUsername (req, res) {
        const usernames = await userModel.getUsers();
        res.json(usernames);
    }

    static async buscarUsername (req, res) {
        const query = req.query.q;
        const resultados = await userModel.searchUsers(query);
        res.json(resultados);
    }

    static async getUserInfoController (req, res) {
        const username = req.params.username;
        const user = await userModel.getUserInfo(username);
        res.json(user);
    }
    // Create
    // Upload
    // Delete
}
