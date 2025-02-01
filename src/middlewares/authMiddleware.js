import jwt from "jsonwebtoken";
import { verifyToken } from '../utils.js'; // Asegúrate de importar correctamente

export const checkAuth = (req, res, next) => {
    
    const token = req.signedCookies?.currentUser || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};



export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado, no eres administrador' });
    }
    next();  // Si todo está bien, pasa al siguiente middleware
};


export const isUser = (req, res, next) => {
    try {
        const token = req.cookies?.token; // ✅ Extraer el token de la cookie

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || decoded.role !== "user") {
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = decoded; // ✅ Guardamos el usuario en req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};