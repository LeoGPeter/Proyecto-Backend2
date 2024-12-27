import { verifyToken } from '../utils.js'; // Asegúrate de importar la función verifyToken correctamente

export const checkAuth = (req, res, next) => {
    const token = req.signedCookies.currentUser; // Obtenemos el token desde la cookie

    if (!token) {
        return res.redirect('/login'); // Si no hay token, redirigimos a /login
    }

    try {
        // Verificar el token con la función verifyToken
        const decoded = verifyToken(token); // Esta función debe devolver los datos del usuario si el token es válido

        if (!decoded) {
            return res.redirect('/login'); // Si el token no es válido, redirigimos a /login
        }

        req.user = decoded; // Agregamos los datos decodificados del usuario a la solicitud
        next(); // Si todo es válido, seguimos a la siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.redirect('/login'); // Si hay algún error en la validación del token, redirigimos a /login
    }
};

