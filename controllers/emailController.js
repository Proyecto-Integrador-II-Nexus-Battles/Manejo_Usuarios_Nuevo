import { HOST, PORT } from "../config.js";
import axios from "axios";

export class EmailController {
  constructor(emailModel) {
    this.emailModel = emailModel;
  }

  async generateURL(req, res) {
    try {
      const { email, nombre, apellido } = req.body;
      if (this.emailModel.rectifyID(email)) {
        return res.status(400).json({ error: "ID is repeated" });
      }
      const token = await this.emailModel.generateToken(email, req.body);
      const url = `${HOST}:${PORT}/usuario/verify?token=${token}`;
      axios.post(`${HOST}:${PORT}/correo/send/confirmacion`, {
        email: email,
        subject: "Confirmar creación de tu cuenta con The Nexus Battles II.",
        message: "",
        username: `${nombre} ${apellido}`,
        url: url,
      });
      res.json({ message: "El token se ha enviado al correo" });
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
        res.json({ message: "Token is valid" });
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
}
