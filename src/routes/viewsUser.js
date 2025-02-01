import express from 'express';
import UserDTO from '../dto/UserDTO.js';
import { checkAuth} from '../middlewares/authMiddleware.js';
     
const router = express.Router();

router.get('/login', (req, res) => {
    const token = req.signedCookies?.currentUser;

    if (token) {
        return res.redirect('/users/current'); // Si ya hay sesión, redirigir a /current
    }

    res.render('login'); // Renderizar la vista login
});


router.get('/current', checkAuth, (req, res) => {
    const userDTO = new UserDTO(req.user); // Convertimos el usuario a DTO
    res.json(userDTO); // Enviamos solo los datos necesarios
});

router.get('/logout', (req, res) => {
    // Eliminar la cookie de sesión
    res.clearCookie('currentUser', { signed: true }); // 'signed' para eliminar la cookie firmada

    // Redirigir a la página de login
    res.redirect('/users/login');
});


export default router;
