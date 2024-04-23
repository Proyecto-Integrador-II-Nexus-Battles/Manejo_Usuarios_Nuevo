import express from "express";
import { userRouter } from "./routes/routes.js"; //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión
import bodyParser from "body-parser";
import cors from "cors";
import { APP_PORT } from "./config.js";
import fs from "fs";
import http from "http";
import https from "https";
import EmailRoutes from "./routes/emailRoutes.js";
import { EmailController } from "./controllers/emailController.js";
import { EmailModel } from "./models/emailModel.js";

const app = express(); // --> Iniciamos express
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by"); // --> Deshabilitar el header x-powered-by

const emailModel = new EmailModel();
const emailRoutes = new EmailRoutes(new EmailController(emailModel));
emailModel.cronDeleteByTime();

app.use("/usuario", userRouter); // --> Usar la variable de entorno PORT, si no usar el port 3000
app.use("/usuario", emailRoutes.router);

app.use(function (req, res, next) {
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

// ---> https protocol
const options = {
  key: fs.readFileSync("certs/privkey.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};
http.createServer(app).listen(80);
https.createServer(options, app).listen(APP_PORT);
console.log(`Server running on port ${APP_PORT}`);
