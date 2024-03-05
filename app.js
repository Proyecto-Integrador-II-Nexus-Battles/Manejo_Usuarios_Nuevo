import express, { json } from 'express'
import { userRouter } from './routes/routes.js' //--> !!!IMPORTANT!!! Siempre que importen un archivo extensión .js .Loquesea, siempre ponerlo en el path, ej -> './routes/template.js' --> el .js es la extensión 

const app = express() // --> Iniciamos express
app.use(json())
app.disable('x-powered-by') // --> Deshabilitar el header x-powered-by


app.use(session({       //Geracion de la sesion con express js
  secret: '777',        //secret key para generar la cookie
  cookie: { maxAge: 60000 },    //tiempo maximo de duracion de una sesion. Unidad en milisegundos
  saveUninitialized: false,     //En false indica que 
  store
}))




app.use(userRouter)

const PORT = process.env.PORT || 5000 // --> Usar la variable de entorno PORT, si no usar el port 3000


app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found!!!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${PORT}`)
})


