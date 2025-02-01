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
export const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            first_name: user.first_name, 
            last_name: user.last_name, 
            email: user.email, 
            age: user.age, 
            role: user.role 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

// Función para verificar el JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET); // Usa la misma clave
    } catch (error) {
        console.error("Error verificando token:", error);
        return null;
    }
};

console.log("JWT_SECRET usado para firmar:", process.env.JWT_SECRET);



export { __dirname };
