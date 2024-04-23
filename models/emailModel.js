import { v4 } from "uuid";
import { pool } from "./db.js";
import axios from "axios";

export class EmailModel {
  constructor() {
    this.users = [];
    this.usersRecuperar = [];
  }

  async generateToken(email, body) {
    try {
      const token = v4();
      this.users.push({
        email: email,
        token: token,
        body: body,
        time: Date.now(),
      });
      return token;
    } catch (error) {
      return { error: error.message };
    }
  }

  verifyToken(token) {
    try {
      const user = this.users.find((user) => user.token === token);
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  rectifyID(email) {
    try {
      const user = this.users.find((user) => user.email === email);
      return !!user;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkQuestions(email, { a, b, c }) {
    try {
      const results = await pool.query(
        "SELECT * FROM users WHERE email = ? AND pregunta_1 = ? AND pregunta_2 = ? AND pregunta_3 = ?",
        [email, a, b, c]
      );
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async generateCode(email) {
    try {
      const results = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      if (results.length === 0) {
        return 0;
      }
      if (this.usersRecuperar.find((user) => user.email === email)) {
        return -1;
      }
      const code = Math.floor(1000 + Math.random() * 9000);
      this.usersRecuperar.push({ email: email, code: code, time: Date.now() });
      console.log(this.usersRecuperar);
      return code;
    } catch (error) {
      return 0;
    }
  }

  verifyCode(email, code) {
    try {
      const user = this.usersRecuperar.find(
        (user) => user.email === email && user.code === Number(code)
      );
      if (user) {
        return gottenUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  async newPassword(email, password, code) {
    try {
      const verify = this.verifyCode(email, code);
      if (verify) {
        const results = await pool.query(
          "SELECT id FROM users WHERE email = ?",
          [email]
        );
        if (results.length === 0) {
          return 0;
        }
        axios
          .patch("/usuario/newData", {
            IdUsuario: results[0].id,
            new_password: password,
          })
          .then((response) => {
            if (response.status === 200) {
              return 1;
            }
          })
          .catch((error) => {
            console.error("Error sending new password:", error);
            return -1;
          });
      } else {
        return -1;
      }
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

  deleteCode(email) {
    this.usersRecuperar = this.usersRecuperar.filter(
      (user) => user.email !== email
    );
  }

  cronDeleteByTime() {
    setInterval(() => {
      console.log("Deleting users older than 10 minutes");
      const now = Date.now();
      this.users = this.users.filter((user) => now - user.time < 600000);
      this.usersRecuperar = this.usersRecuperar.filter(
        (user) => now - user.time < 600000
      );
    }, 5000);
  }
}
