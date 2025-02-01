import { __dirname } from './utils.js';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from "cookie-parser";
import userApiRouter from './routes/users.js';
import userViewRouter from './routes/viewsUser.js';
import sessionsRouter from './routes/sessions.js';
import productRouter from './routes/productRoutes.js'
import { connectMongo } from "./config/mongo.js";
import { engine } from "express-handlebars";
import cartsRoutes from './routes/cart.routes.js'
import cors from 'cors';

// Configuración de dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // Firmar cookies
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Configurar views y carpeta estática
app.engine(
    'handlebars',
    engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set('views', path.join(__dirname, 'views')); // Para Handlebars
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos

// Rutas base
app.use('/api/users', userApiRouter); // Rutas para servicios
app.use('/users', userViewRouter);   // Rutas para vistas
app.use('/api/users', sessionsRouter);
app.use('/api/carts', cartsRoutes); // Agrega la ruta de sesiones a tu servidor
app.use('/api/products', productRouter);

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

connectMongo();