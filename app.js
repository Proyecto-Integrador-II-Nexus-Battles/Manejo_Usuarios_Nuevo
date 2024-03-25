import cors from 'cors'
import express, { json } from 'express'
import { userRouter } from './routes/routes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 
import { APP_PORT } from "./config.js";

const app = express() // --> Iniciamos express
app.use(json()) 
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by

app.use(cors())
app.use('/usuario', userRouter)

app.listen(APP_PORT, () => {
  console.log(`Server listen on port ${APP_PORT}`)
})
