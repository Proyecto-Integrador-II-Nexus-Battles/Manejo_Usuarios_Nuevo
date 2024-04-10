import { Router } from "express";

export default class EmailRoutes {
  constructor(emailController) {
    this.emailController = emailController;
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post(
      "/token",
      this.emailController.generateURL.bind(this.emailController)
    );
    this.router.get(
      "/verify",
      this.emailController.verifyToken.bind(this.emailController)
    );
  }
}
