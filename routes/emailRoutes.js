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
      "/token/verify",
      this.emailController.verifyToken.bind(this.emailController)
    );
    this.router.post(
      "/check/questions",
      this.emailController.checkQuestions.bind(this.emailController)
    );
    this.router.post(
      "/code/verify",
      this.emailController.verifyCode.bind(this.emailController)
    );
  }
}
