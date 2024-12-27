import express from 'express';
import { checkAuth} from '../middlewares/auth.js';
     
const router = express.Router();

// Vista de login (usuarios no autenticados)
router.get('/login', (req, res) => {
    const token = req.signedCookies?.currentUser;

    if (token) {
        return res.redirect('/users/current');
    }

    res.render('login');
});

// Ruta protegida para ver los datos del usuario
router.get('/current', checkAuth, (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    res.render('current', {
        first_name,
        last_name,
        email,
        age,
        role
    });
});

router.get('/logout', (req, res) => {
    // Eliminar la cookie de sesión
    res.clearCookie('currentUser', { signed: true }); // 'signed' para eliminar la cookie firmada

    // Redirigir a la página de login
    res.redirect('/users/login');
});


export default router;
