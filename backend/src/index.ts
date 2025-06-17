import express  from "express";
import morgan from 'morgan';
import authRoute from './routes/auth.routes';
import {connectDBMongo} from "./config/db";

//inicializar el servidor de express
const app = express ();

//asignar el numero de puerto
const PORT = 3000;

app.use(express.json()); //.Todo lo que resiva es de tipo json
app.use(morgan('dev')); //Mostrar logs de las peticiones 

app.use('/api/v1/auth', authRoute); //ruta principal 

connectDBMongo().then(() => {
app.listen(PORT, ()=>{
    console.log("El servidor esta funcionando:", PORT);
});
});