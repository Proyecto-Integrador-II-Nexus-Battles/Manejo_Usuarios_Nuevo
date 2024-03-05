import { userModel } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// En esta clase se encarga de controlar los datos y consultas (get-post) y devolverlas en formato JSON
// Hacia la vista que las requiera
export class userController {
  // --> TODOS LOS ARCHIVOS FUNCIONAM COMO UNA CAJA FUERTE
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
    console.log("email", email);
    // Se obtienen el correo electrónico y la contraseña almacenados en la base de datos
    let email_db = await userModel.getUserEmail(email);
    let password_db = await userModel.getPassword(email);
    console.log(password_db)
    // Se verifica si el correo electrónico y la contraseña coinciden con los de la base de datos
    if (email === email_db && bcrypt.compareSync(password, password_db)) {
      //Cambios Santiago (Borrar este comentario)
      if (JWT_SECRET === "") {
        const token = jwt.sign({ email }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        res.json("Not a JWT_SECRET provided in ENV");
      }
    } else {
      // Si las credenciales no coinciden, se devuelve un mensaje de error
      res.json("not authenticated");
    }
  }



  static async register(req, res) {
    try {
      const hash = await bcrypt.hash(req.body.password, 12);
      const {
        nombre,
        apellido,
        email,
        metodospago,
        numero_tarjeta,
        cvv,
        fecha_exp,
        pregunta_1,
        pregunta_2,
        pregunta_3,
      } = req.body;

      // Inserta los datos del usuario en la base de datos utilizando pool.query
      await pool.query(
        "INSERT INTO sofia.users(nombre, apellido, email, password, metodospago, numero_tarjeta, cvv, fecha_exp, pregunta_1, pregunta_2, pregunta_3) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [
          nombre,
          apellido,
          email,
          hash,
          metodospago,
          numero_tarjeta,
          cvv,
          fecha_exp,
          pregunta_1,
          pregunta_2,
          pregunta_3,
        ]
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
