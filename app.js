import express, { json } from "express";
import { userRouter } from "./routes/routes.js"; //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión
import { PORT } from "./config.js";

const app = express(); // --> Iniciamos express
app.use(json());
app.disable("x-powered-by"); // --> Deshabilitar el header x-powered-by

app.use("/usuario", userRouter); // --> Usar la variable de entorno PORT, si no usar el port 3000

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`);
});
