import morgan from 'morgan';
import express from 'express';
import authRoute from './routes/auth.routes';
// import { connect } from 'http2'; // Esta línea no parece necesaria, pero no la removo ya que pediste no quitar nada
import { connectDBMongo } from './config/db';
import orderRoutes from './routes/order.routers'; // Importar las rutas de órdenes
import productRoutes from './routes/product.routes'; // Importar las rutas de productos
import cors from 'cors';
import menuRoutes from './routes/menu.routes';

// Inicializar el servidor de express 
const app = express();
app.use(express.json());
// Asignar el número de puerto
const PORT = 3000;
app.use(cors());

app.use(morgan('dev') as express.RequestHandler);  // Mostrar logs de las peticiones
app.use('/api/vi/auth', authRoute); // ruta principal
app.use('/api/vi/order', orderRoutes);
app.use('/api/vi/product', productRoutes); // Ruta para los productos
app.use('/api/vi', menuRoutes); // Usa el mismo prefijo base

// Ruta para las órdenes
connectDBMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`El servidor funciona con el puerto: ${PORT}`);
        console.log("El servidor está funcionando:", PORT);
    });
});
