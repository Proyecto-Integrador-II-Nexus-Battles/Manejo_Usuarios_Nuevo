import express, { json } from "express";
import { userRouter } from "./routes/routes.js"; //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión
import bodyParser from "body-parser";
import cors from 'cors'
import express, { json } from 'express'
import { userRouter } from './routes/routes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 
import { APP_PORT } from "./config.js";

const app = express(); // --> Iniciamos express
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by"); // --> Deshabilitar el header x-powered-by




app.use("/usuario", userRouter); // --> Usar la variable de entorno PORT, si no usar el port 3000



app.use(function (req, res, next) {

  res.append('Access-Control-Allow-Origin', ['http://localhost:5000/register']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next()
});




app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});
app.use(cors())
app.use('/usuario', userRouter)
app.listen(APP_PORT, () => {
  console.log(`Server listen on port ${APP_PORT}`)
});
