import { pool } from "./db.js";
// En esta clase se encargaran de hacer la logica de negocio, también realizar conexión a la base de datos desde este *archivo* <-- !IMPORTANT
export class userModel {
    static async getUsers() {
        const usernamesResult = await pool.query("SELECT nombre FROM users");
        return usernamesResult;
    }

    static async searchUsers(query) {
        const resultados = await pool.query("SELECT nombre FROM users WHERE nombre LIKE ?", [`${query}%`]);
        return resultados;
    }

    static async getUserInfo(username) {
        const userResult = await pool.query("SELECT nombre, apellido, usuario, email, metodospago FROM users WHERE nombre = ?", [username]);
        return userResult[0];
    }

    static async getUserEmail(email) {

        let email_db = await pool.query("SELECT email FROM users WHERE email=?", [email]);
        return email_db[0];

    }

    static async getPassword(email) {

        let password_db = await pool.query("SELECT password FROM users WHERE email=?", [email]);
        console.log(password_db)
        console.log(password_db[0])
        return password_db[0];
    }

    static async getUserID(email) {

        let id = await pool.query("SELECT id FROM users WHERE email=?", [email]);
        return id[0];
    }



}