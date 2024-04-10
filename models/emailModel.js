import { v4 } from "uuid";

export class EmailModel {
  constructor() {
    this.users = [];
  }

  async generateToken(email, body) {
    try {
      const token = v4();
      this.users.push({ email: email, token: token, body: body });
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
}
