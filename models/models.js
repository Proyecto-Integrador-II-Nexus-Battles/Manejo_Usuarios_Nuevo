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
    // getByID
    // CREATE
    // UPDATE
    // DELETE
}
