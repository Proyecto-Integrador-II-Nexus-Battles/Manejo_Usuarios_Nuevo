import { pool } from "./db.js";
// En esta clase se encargaran de hacer la logica de negocio, también realizar conexión a la base de datos desde este *archivo* <-- !IMPORTANT
export class userModel {
  static async getUsers() {
    const usernamesResult = await pool.query("SELECT username FROM users");
    return usernamesResult;
  }

  static async searchUsers(query) {
    const resultados = await pool.query(
      "SELECT username FROM users WHERE username LIKE ?",
      [`${query}%`]
    );
    return resultados;
  }

  static async getUserInfo(username) {
    const userResult = await pool.query(
      "SELECT nombre, apellido, username, email, metodospago FROM users WHERE username = ?",
      [username]
    );
    return userResult[0];
  }

  static async getUserInfoByID(id) {
    const userResult = await pool.query(
      "SELECT nombre, apellido, username, email, metodospago FROM users WHERE id = ?",
      [id]
    );
    return userResult[0];
  }

  static async getUserMiCuenta({ IdUsuario }) {
    const userInfo = await pool.query(
      "SELECT nombre, apellido, username, avatar FROM users WHERE id = ?",
      [IdUsuario]
    );
    return userInfo[0];
  }

  static async PatchMiCuenta({ IdUsuario, new_username, hash }) {
    try {
      const result = await pool.query(
        `UPDATE users 
                 SET 
                    username = COALESCE(NULLIF(?, ''), username), 
                    password = COALESCE(NULLIF(?, ''), password) 
                 WHERE 
                    id = ?`,
        [new_username, hash, IdUsuario]
      );

      if (result.affectedRows > 0) {
        return {
          success: true,
          message: "Se actualizaron los datos de la cuenta correctamente.",
        };
      } else {
        return {
          success: false,
          message: "No se encontró ningún usuario con el ID proporcionado.",
        };
      }
    } catch (error) {
      console.error("Error al actualizar los datos de la cuenta:", error);
      return {
        success: false,
        message:
          "Ocurrió un error al actualizar los datos de la cuenta. Por favor, inténtalo de nuevo más tarde.",
      };
    }
  }

  static async getUserEmail(email) {
    let email_db = await pool.query("SELECT email FROM users WHERE email=?", [
      email,
    ]);
    return email_db[0];
  }

  static async getPassword(email) {
    let password_db = await pool.query(
      "SELECT password FROM users WHERE email=?",
      [email]
    );
    return password_db[0];
  }

  static async getUserID(email) {
    let id = await pool.query("SELECT id FROM users WHERE email=?", [email]);
    return id[0];
  }
}
