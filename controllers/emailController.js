import { HOST, PORT } from "../config.js";
import axios from "axios";

export class EmailController {
  constructor(emailModel) {
    this.emailModel = emailModel;
  }

  async generateURL(req, res) {
    try {
      const { email, nombre, apellido } = req.body;
      const rectify = await this.emailModel.rectifyID(email);
      if (rectify) {
        return res.status(400).json({ error: "ID is repeated" });
      }
      const token = await this.emailModel.generateToken(email, req.body);
      const url = `${HOST}:${PORT}/usuario/token/verify?token=${token}`;
      axios
        .post(`${HOST}:${PORT}/correo/send/confirmacion`, {
          email: email,
          subject: "Confirmar creación de tu cuenta con The Nexus Battles II.",
          message: "",
          username: `${nombre} ${apellido}`,
          url: url,
        })
        .then((response) => {
          if (response.status === 200) {
            return res.status(200).json({ message: "Token was sent to email" });
          }
        })
        .catch((error) => {
          console.error("Error sending token:", error);
          return res
            .status(500)
            .json({ error: "An error occurred while sending the token" });
        });
    } catch (error) {
      console.error("Error generating token:", error);
      res
        .status(500)
        .json({ error: "An error occurred while generating the token" });
    }
  }

  async verifyToken(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      const user = this.emailModel.verifyToken(token);
      if (user) {
        axios.post("/usuario/register", user.body);
        res.status(200).json({ message: "Token is valid" });
      } else {
        res.status(401).json({ error: "Token is invalid" });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      res
        .status(500)
        .json({ error: "An error occurred while verifying the token" });
    }
  }

  async checkQuestions(req, res) {
    try {
      const { a, b, c, email } = req.body;
      const user = await this.emailModel.checkQuestions(email, { a, b, c });
      if (user) {
        const code = await this.emailModel.generateCode(email);
        if (code === 0) {
          return res.status(400).json({ error: "El correo no existe" });
        }
        if (code === -1) {
          return res.status(421).json({
            error: "El correo ya se encuentra en proceso de verificación",
          });
        }
        const username = user.username;
        if (!username) {
          return res.status(419).json({
            error: "El correo no se encuentra registrado",
          });
        }
        axios
          .post(`${HOST}:${PORT}/correo/send/recuperacion`, {
            email: email,
            subject: "Recupera tu cuenta",
            message:
              "Te enviamos el siguiente código para que puedas recuperar tu cuenta.",
            username: username,
            code: code,
          })
          .then((response) => {
            if (response.status === 200) {
              return res.status(200).json({
                message: "Questions were answered right, code was sent",
              });
            }
          })
          .catch((error) => {
            console.error("Error sending code:", error);
            return res
              .status(500)
              .json({ error: "An error occurred while sending the code" });
          });
      } else {
        res.status(420).json({ error: "Questions were not answered right" });
      }
    } catch (error) {
      console.error("Error checking questions:", error);
      res
        .status(500)
        .json({ error: "An error occurred while checking the questions" });
    }
  }

  async verifyCode(req, res) {
    try {
      const { email, code } = req.body;
      const user = this.emailModel.verifyCode(email, code);
      if (user) {
        res.status(200).json({ message: "Code is valid" });
      } else {
        res.status(404).json({ error: "Code is invalid" });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      res
        .status(500)
        .json({ error: "An error occurred while verifying the code" });
    }
  }

  async changePassword(req, res) {
    try {
      const { email, password, code } = req.body;
      const result = await this.emailModel.newPassword(email, password, code);
      if (result === 1) {
        res.json({ message: "Password was changed" });
      } else if (result === 0) {
        res.status(404).json({ error: "Email is not registered" });
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while changing the password" });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      res
        .status(500)
        .json({ error: "An error occurred while changing the password" });
    }
  }
}
