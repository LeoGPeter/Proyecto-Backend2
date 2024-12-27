import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para hashear contraseñas
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Función para comparar contraseñas
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Función para generar un JWT
export const generateToken = (userData) => {
    // Asegúrate de que process.env.JWT_SECRET esté definido y no sea undefined
    if (!process.env.JWT_SECRET) {
        throw new Error("La clave secreta JWT no está definida en .env");
    }

    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función para verificar el JWT
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
        return decoded; // Si todo está bien, devolvemos los datos del usuario
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return null; // Retorna null si el token no es válido
    }
};



export { __dirname };
