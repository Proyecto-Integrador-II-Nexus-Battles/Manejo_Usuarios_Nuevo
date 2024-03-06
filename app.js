import cors from 'cors'
import express, { json } from 'express'
import { userRouter } from './routes/routes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 

const app = express() // --> Iniciamos express
app.use(json()) 
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by

app.use(cors())
app.use('/usuario', userRouter)

const PORT = process.env.PORT || 3000 // --> Usar la variable de entorno PORT, si no usar el port 3000

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})
